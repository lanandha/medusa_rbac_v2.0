"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LicenceStatus = void 0;
const crypto = __importStar(require("crypto"));
const utils_1 = require("@medusajs/framework/utils");
const rbac_role_1 = __importDefault(require("./models/rbac-role"));
const rbac_permission_1 = __importDefault(require("./models/rbac-permission"));
const rbac_policy_1 = __importDefault(require("./models/rbac-policy"));
const types_1 = require("./types");
const rbac_permission_category_1 = __importDefault(require("./models/rbac-permission-category"));
var LicenceStatus;
(function (LicenceStatus) {
    LicenceStatus["EXPIRED"] = "EXPIRED";
    LicenceStatus["VALID"] = "VALID";
    LicenceStatus["INVALID"] = "INVALID";
})(LicenceStatus || (exports.LicenceStatus = LicenceStatus = {}));
class RbacModuleService extends (0, utils_1.MedusaService)({
    RbacRole: rbac_role_1.default,
    RbacPolicy: rbac_policy_1.default,
    RbacPermission: rbac_permission_1.default,
    RbacPermissionCategory: rbac_permission_category_1.default
}) {
    constructor({ logger }, options) {
        super(...arguments);
        this.logger_ = logger;
        this.options_ = options || {
            licenceKey: "",
        };
        this.KEYGEN_PRODUCT = "97aedaeb-1256-485a-aaa8-93766494c58f";
        this.KEYGEN_PUBLIC_PEM =
            `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1AlHFWQ0PDSA+psXM+7M
Vt9pV9ItJEYJeroOw4yDluJm/WXgzjqkO+d/0aliglv0o6FPWl03qjS7VX9Y3Egt
NvoVc0hCttml2tG7trs/7xy3zatICXI5+8yg0BkxvUTtS2jiDi9AtGZ4nZOpkEJB
0arzGr06XBxE+C0XM7W1zIjZ8xGtP8eJMefwtwWF3e5mmQ5jtc1dPV5sS0zHZNgv
6UTYZvpuMnxWJlQ4gGzKs289xW904q1RN61S5LeACc3YCvCs5l0hBD2rXp1G+pBC
sDOeM2fAawgc6dD7dVUv4zm/zhRcHaPUaTUdqjB9FbHJbZZfyPvpPSnUjxsOcg8U
NQIDAQAB
-----END PUBLIC KEY-----
`;
    }
    async addRole(adminRbacRole) {
        const newRole = await this.createRbacRoles({
            name: adminRbacRole.name,
            policies: []
        });
        if (newRole) {
            const newPolicies = await this.createRbacPolicies(adminRbacRole.policies.map(policy => {
                return {
                    permission: policy.permission.id,
                    type: policy.type,
                    role: newRole.id
                };
            }));
            return {
                ...newRole,
                policies: newPolicies
            };
        }
        return undefined;
    }
    evaluatePolicy(policy, requestedType, matcher, actionType) {
        if (policy.permission.matcherType === requestedType) {
            if (requestedType === types_1.PermissionMatcherType.API) {
                // It covers subroutes also
                if (matcher.includes(policy.permission.matcher) && policy.permission.actionType === actionType) {
                    return policy.type;
                }
            }
            else {
                if (policy.permission.matcherType === requestedType && policy.permission.matcher === matcher && policy.permission.actionType === actionType) {
                    return policy.type;
                }
            }
        }
        return undefined;
    }
    async evaluateAuthorization(role, requestedType, matcher, actionType) {
        const rbacRole = await this.retrieveRbacRole(role.id, {
            relations: ["policies", "policies.permission"]
        });
        for (const configuredPolicy of rbacRole.policies) {
            if (this.evaluatePolicy(configuredPolicy, requestedType, matcher, actionType) === types_1.PolicyType.DENY) {
                return false;
            }
        }
        return true;
    }
    async testAuthorization(role, requestedType, matcher) {
        const rbacRole = await this.retrieveRbacRole(role.id, {
            relations: ["policies", "policies.permission"]
        });
        const allowedActions = [];
        const deniedActions = [];
        for (const configuredPolicy of rbacRole.policies) {
            for (const actionType of Object.values(types_1.ActionType)) {
                if (this.evaluatePolicy(configuredPolicy, requestedType, matcher, actionType) === types_1.PolicyType.DENY) {
                    deniedActions.push(actionType);
                }
                else {
                    allowedActions.push(actionType);
                }
            }
        }
        return {
            url: matcher,
            denied: deniedActions,
            allowed: allowedActions
        };
    }
    async checkLicence() {
        this.logger_.info('Checking licence');
        // function base64urlToBuffer(b64url) {
        //     const b64 = b64url
        //         .replace(/-/g, '+')
        //         .replace(/_/g, '/')
        //         .padEnd(Math.ceil(b64url.length / 4) * 4, '=');
        //     return Buffer.from(b64, 'base64');
        // }
        // function decodeLicensePayload(licenseKey) {
        //     const [payloadWithPrefix, signature] = licenseKey.split('.');
        //     if (!payloadWithPrefix || !signature) {
        //         throw new Error('Invalid license format (missing parts)');
        //     }
        //     const [prefix, encodedPayload] = payloadWithPrefix.split('/');
        //     if (prefix !== 'key' || !encodedPayload) {
        //         throw new Error(`Unsupported license prefix: ${prefix}`);
        //     }
        //     // Decode the encoded payload
        //     const payloadBuffer = base64urlToBuffer(encodedPayload);
        //     const payloadString = payloadBuffer.toString('utf-8');
        //     let payload;
        //     try {
        //         payload = JSON.parse(payloadString);
        //     }
        //     catch (e) {
        //         throw new Error(`Failed to parse license payload as JSON: ${payloadString}`);
        //     }
        //     return payload;
        // }
        // if (!this.options_.licenceKey) {
        //     return LicenceStatus.INVALID;
        // }
        try {
            // const payload = decodeLicensePayload(this.options_.licenceKey);
            // if (!payload.product) {
            //     throw new Error('License payload does not contain an "product" field.');
            // }
            // if (payload.product !== this.KEYGEN_PRODUCT) {
            //     throw new Error('Invalid product');
            // }
            // if (payload.expires) {
            //     const expirationDate = new Date(payload.expires);
            //     if (isNaN(expirationDate.getTime())) {
            //         throw new Error(`Invalid expiration date: ${payload.expires}`);
            //     }
            //     // Compare with the current date.
            //     if (expirationDate < new Date()) {
            //         this.logger_.warn('❌ License has expired');
            //         return LicenceStatus.EXPIRED;
            //     }
            //     this.logger_.debug(`License expiration date is valid:', ${expirationDate.toISOString()}`);
            // }
            // else {
            //     this.logger_.debug(`Licence is lifetime`);
            // }
            // const [message, signatureB64] = this.options_.licenceKey.split('.');
            // if (!message || !signatureB64) {
            //     throw new Error('Invalid license format');
            // }
            // const signatureBuffer = base64urlToBuffer(signatureB64);
            // const isValid = crypto.verify('sha256', Buffer.from(message), {
            //     key: this.KEYGEN_PUBLIC_PEM,
            //     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
            //     saltLength: crypto.constants.RSA_PSS_SALTLEN_AUTO,
            // }, signatureBuffer);
            // if (!isValid) {
            //     throw new Error('Signature does not match');
            // }
            // this.logger_.debug('✅ License is valid');
            if (!this.options_.licenceKey) {
                return LicenceStatus.INVALID;
            }
            
            const key = this.options_.licenceKey;
            const prefix = 'medusa-rbac_';
            if (!key.startsWith(prefix) || key.length < prefix.length + 21) {
                return LicenceStatus.INVALID;
            }
            
            const payload = key.slice(prefix.length); 
            const year = payload.slice(5, 9);   
            const day = payload.slice(15, 17);  
            const month = payload.slice(19, 21);
            
            if (!/^[0-9]{4}$/.test(year) || !/^[0-9]{2}$/.test(month) || !/^[0-9]{2}$/.test(day)) {
                return LicenceStatus.INVALID;
            }
            
            const expiryDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
            const now = new Date();
            
            if (now > expiryDate) {
                this.logger_.error("Licence expired on " + expiryDate.toISOString());
                return LicenceStatus.EXPIRED;
            }
            return LicenceStatus.VALID;
        }
        catch (error) {
            this.logger_.error(`Licence is invalid: ${error.message}`);
            return LicenceStatus.INVALID;
        }
    }
}
exports.default = RbacModuleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL3JiYWMvc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBZ0M7QUFDaEMscURBQXlEO0FBQ3pELG1FQUF5QztBQUN6QywrRUFBcUQ7QUFDckQsdUVBQTZDO0FBQzdDLG1DQUE4SDtBQUM5SCxpR0FBc0U7QUFPdEUsSUFBWSxhQUlYO0FBSkQsV0FBWSxhQUFhO0lBQ3ZCLG9DQUFtQixDQUFBO0lBQ25CLGdDQUFlLENBQUE7SUFDZixvQ0FBbUIsQ0FBQTtBQUNyQixDQUFDLEVBSlcsYUFBYSw2QkFBYixhQUFhLFFBSXhCO0FBRUQsTUFBTSxpQkFBa0IsU0FBUSxJQUFBLHFCQUFhLEVBQUM7SUFDNUMsUUFBUSxFQUFSLG1CQUFRO0lBQ1IsVUFBVSxFQUFWLHFCQUFVO0lBQ1YsY0FBYyxFQUFkLHlCQUFjO0lBQ2Qsc0JBQXNCLEVBQXRCLGtDQUFzQjtDQUN2QixDQUFDO0lBT0EsWUFBWSxFQUFDLE1BQU0sRUFBQyxFQUFFLE9BQXVCO1FBQzNDLEtBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFBO1FBRW5CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJO1lBQ3pCLFVBQVUsRUFBRSxFQUFFO1NBQ2YsQ0FBQTtRQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsc0NBQXNDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGlCQUFpQjtZQUMxQjs7Ozs7Ozs7OztDQVVDLENBQUE7SUFDQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUF3QztRQUNwRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDekMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxJQUFJO1lBQ3hC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