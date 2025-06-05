"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const rbac_permission_1 = __importDefault(require("./rbac-permission"));
const rbac_role_1 = __importDefault(require("./rbac-role"));
const types_1 = require("../types");
const RbacPolicy = utils_1.model.define("rbac_policy", {
    id: utils_1.model.id().primaryKey(),
    type: utils_1.model.enum(types_1.PolicyType),
    permission: utils_1.model.belongsTo(() => rbac_permission_1.default, {
        mappedBy: "policies"
    }),
    role: utils_1.model.belongsTo(() => rbac_role_1.default, {
        mappedBy: "policies"
    })
});
exports.default = RbacPolicy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1wb2xpY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYmFjL21vZGVscy9yYmFjLXBvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFEQUFpRDtBQUNqRCx3RUFBOEM7QUFDOUMsNERBQWtDO0FBQ2xDLG9DQUFxQztBQUVyQyxNQUFNLFVBQVUsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtJQUM3QyxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDO0lBQzVCLFVBQVUsRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUFjLEVBQUU7UUFDaEQsUUFBUSxFQUFFLFVBQVU7S0FDckIsQ0FBQztJQUNGLElBQUksRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFRLEVBQUU7UUFDcEMsUUFBUSxFQUFFLFVBQVU7S0FDckIsQ0FBQztDQUNILENBQUMsQ0FBQTtBQUVGLGtCQUFlLFVBQVUsQ0FBQSJ9