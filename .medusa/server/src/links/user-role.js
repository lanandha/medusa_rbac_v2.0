"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rbac_1 = __importDefault(require("../modules/rbac"));
const user_1 = __importDefault(require("@medusajs/medusa/user"));
const utils_1 = require("@medusajs/framework/utils");
exports.default = (0, utils_1.defineLink)({
    linkable: user_1.default.linkable.user,
    isList: true,
}, rbac_1.default.linkable.rbacRole);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL3VzZXItcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDJEQUF3QztBQUN4QyxpRUFBOEM7QUFDOUMscURBQXNEO0FBRXRELGtCQUFlLElBQUEsa0JBQVUsRUFDdkI7SUFDRSxRQUFRLEVBQUUsY0FBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJO0lBQ2xDLE1BQU0sRUFBRSxJQUFJO0NBQ2IsRUFDRCxjQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FDN0IsQ0FBQSJ9