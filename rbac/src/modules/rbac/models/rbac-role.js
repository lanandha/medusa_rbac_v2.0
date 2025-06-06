"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const rbac_policy_1 = __importDefault(require("./rbac-policy"));
const RbacRole = utils_1.model.define("rbac_role", {
    id: utils_1.model.id().primaryKey(),
    name: utils_1.model.text(),
    policies: utils_1.model.hasMany(() => rbac_policy_1.default, {
        mappedBy: "role"
    })
})
    .cascades({
    delete: ["policies"],
});
exports.default = RbacRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmJhYy1yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmJhYy9tb2RlbHMvcmJhYy1yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscURBQWlEO0FBQ2pELGdFQUFzQztBQUV0QyxNQUFNLFFBQVEsR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUN6QyxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRTtJQUMzQixJQUFJLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUNsQixRQUFRLEVBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBVSxFQUFFO1FBQ3hDLFFBQVEsRUFBRSxNQUFNO0tBQ2pCLENBQUM7Q0FDSCxDQUFDO0tBQ0QsUUFBUSxDQUFDO0lBQ1IsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDO0NBQ3JCLENBQUMsQ0FBQTtBQUVGLGtCQUFlLFFBQVEsQ0FBQSJ9