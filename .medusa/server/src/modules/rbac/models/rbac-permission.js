"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const types_1 = require("../types");
const rbac_policy_1 = __importDefault(require("./rbac-policy"));
const rbac_permission_category_1 = __importDefault(require("./rbac-permission-category"));
const RbacPermission = utils_1.model.define("rbac_permission", {
    id: utils_1.model.id().primaryKey(),
    name: utils_1.model.text(),
    type: utils_1.model.enum(types_1.PermissionType),
    matcherType: utils_1.model.enum(types_1.PermissionMatcherType),
    matcher: utils_1.model.text(),
    actionType: utils_1.model.enum(types_1.ActionType),
    policies: utils_1.model.hasMany(() => rbac_policy_1.default, {
        mappedBy: "permission"
    }),
    category: utils_1.model.belongsTo(() => rbac_permission_category_1.default, {
        mappedBy: "permissions"
    }).nullable()
}).cascades({
    delete: ["policies"],
});
exports.default = RbacPermission;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1wZXJtaXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmJhYy9tb2RlbHMvcmJhYy1wZXJtaXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQWlEO0FBQ2pELG9DQUE0RTtBQUM1RSxnRUFBc0M7QUFDdEMsMEZBQStEO0FBRS9ELE1BQU0sY0FBYyxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7SUFDckQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDbEIsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLENBQUMsc0JBQWMsQ0FBQztJQUNoQyxXQUFXLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyw2QkFBcUIsQ0FBQztJQUM5QyxPQUFPLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNyQixVQUFVLEVBQUUsYUFBSyxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDO0lBQ2xDLFFBQVEsRUFBRSxhQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFVLEVBQUU7UUFDeEMsUUFBUSxFQUFFLFlBQVk7S0FDdkIsQ0FBQztJQUNGLFFBQVEsRUFBRSxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLGtDQUFzQixFQUFFO1FBQ3RELFFBQVEsRUFBRSxhQUFhO0tBQ3hCLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDZCxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ1YsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO0NBQ3JCLENBQUMsQ0FBQTtBQUVGLGtCQUFlLGNBQWMsQ0FBQSJ9