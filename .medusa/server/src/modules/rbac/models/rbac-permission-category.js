"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const rbac_permission_1 = __importDefault(require("./rbac-permission"));
const types_1 = require("../types");
const RbacPermissionCategory = utils_1.model.define("rbac_permission_category", {
    id: utils_1.model.id().primaryKey(),
    name: utils_1.model.text(),
    type: utils_1.model.enum(types_1.PermissionCategoryType),
    permissions: utils_1.model.hasMany(() => rbac_permission_1.default, {
        mappedBy: "category"
    })
})
    .cascades({
    delete: ["permissions"],
});
exports.default = RbacPermissionCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1wZXJtaXNzaW9uLWNhdGVnb3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmJhYy9tb2RlbHMvcmJhYy1wZXJtaXNzaW9uLWNhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQWlEO0FBQ2pELHdFQUE4QztBQUM5QyxvQ0FBaUQ7QUFFakQsTUFBTSxzQkFBc0IsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLDBCQUEwQixFQUFFO0lBQ3RFLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLElBQUksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ2xCLElBQUksRUFBRSxhQUFLLENBQUMsSUFBSSxDQUFDLDhCQUFzQixDQUFDO0lBQ3hDLFdBQVcsRUFBRSxhQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLHlCQUFjLEVBQUU7UUFDL0MsUUFBUSxFQUFFLFVBQVU7S0FDckIsQ0FBQztDQUNILENBQUM7S0FDRCxRQUFRLENBQUM7SUFDUixNQUFNLEVBQUUsQ0FBQyxhQUFhLENBQUM7Q0FDeEIsQ0FBQyxDQUFBO0FBRUYsa0JBQWUsc0JBQXNCLENBQUEifQ==