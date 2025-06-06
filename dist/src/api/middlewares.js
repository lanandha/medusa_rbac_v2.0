"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const medusa_1 = require("@medusajs/medusa");
const utils_1 = require("@medusajs/framework/utils");
const rbac_1 = require("../modules/rbac");
const types_1 = require("../modules/rbac/types");
const utils_2 = require("../modules/rbac/utils");
let cachedLicenseStatus = null;
let cacheTimestamp = null;
const CACHE_DURATION = 1000 * 60 * 5;
var LicenceStatus;
(function (LicenceStatus) {
    LicenceStatus["EXPIRED"] = "EXPIRED";
    LicenceStatus["VALID"] = "VALID";
    LicenceStatus["INVALID"] = "INVALID";
})(LicenceStatus || (LicenceStatus = {}));
exports.default = (0, medusa_1.defineMiddlewares)({
    routes: [
        {
            matcher: "/admin/licence",
            middlewares: [
                async (req, res, next) => {
                    if (cachedLicenseStatus && cachedLicenseStatus === LicenceStatus.VALID && Date.now() - (cacheTimestamp ? cacheTimestamp : Date.now()) < CACHE_DURATION) {
                        return res.status(200).json({
                            licence: cachedLicenseStatus
                        });
                    }
                    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
                    try {
                        const result = await rbacModuleService.checkLicence();
                        cachedLicenseStatus = result;
                        cacheTimestamp = Date.now();
                        return res.status(200).json({
                            licence: result
                        });
                    }
                    catch (error) {
                        throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.DB_ERROR, error.message);
                    }
                }
            ]
        },
        {
            matcher: "/admin/*",
            middlewares: [
                async (req, res, next) => {
                    const rawRequest = req;
                    if (rawRequest.baseUrl === "/admin/rbac/check") {
                        return next();
                    }
                    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
                    const { data: rolesWithUsers, } = await query.graph({
                        entity: "rbac_role",
                        fields: [
                            "*",
                            "users.*",
                        ],
                    });
                    if (rawRequest.session && rawRequest.session.auth_context && rawRequest.session.auth_context.actor_id) {
                        const existingRole = rolesWithUsers.find(ru => ru.users.find(u => u.id === rawRequest.session.auth_context.actor_id));
                        if (existingRole) {
                            const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
                            const rbacAction = (0, utils_2.convertApiMethodToRbacAction)(rawRequest.method);
                            if (rbacAction) {
                                const authorization = await rbacModuleService.evaluateAuthorization(existingRole, types_1.PermissionMatcherType.API, rawRequest.baseUrl, rbacAction);
                                if (!authorization) {
                                    return res.json({
                                        unauthorized: true
                                    });
                                }
                                else {
                                    return next();
                                }
                            }
                            else {
                                return next();
                            }
                        }
                        else {
                            return next();
                        }
                    }
                    else {
                        return next();
                    }
                },
            ],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkNBQW9EO0FBTXBELHFEQUFvRztBQUNwRywwQ0FBNkM7QUFFN0MsaURBQTZEO0FBQzdELGlEQUFvRTtBQUVwRSxJQUFJLG1CQUFtQixHQUF5QixJQUFJLENBQUM7QUFDckQsSUFBSSxjQUFjLEdBQWtCLElBQUksQ0FBQztBQUN6QyxNQUFNLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUVyQyxJQUFLLGFBSUo7QUFKRCxXQUFLLGFBQWE7SUFDaEIsb0NBQW1CLENBQUE7SUFDbkIsZ0NBQWUsQ0FBQTtJQUNmLG9DQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKSSxhQUFhLEtBQWIsYUFBYSxRQUlqQjtBQUVELGtCQUFlLElBQUEsMEJBQWlCLEVBQUM7SUFDL0IsTUFBTSxFQUFFO1FBQ047WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQ0gsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsSUFBd0IsRUFDeEIsRUFBRTtvQkFDRixJQUFJLG1CQUFtQixJQUFJLG1CQUFtQixLQUFLLGFBQWEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLGNBQWMsRUFBRSxDQUFDO3dCQUN2SixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDOzRCQUMxQixPQUFPLEVBQUUsbUJBQW1CO3lCQUM3QixDQUFDLENBQUM7b0JBQ0wsQ0FBQztvQkFFRCxNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8s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