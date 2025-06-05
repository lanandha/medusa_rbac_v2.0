"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const rbac_1 = require("../modules/rbac");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_1 = require("@medusajs/framework/utils");
const stepDeleteRole = (0, workflows_sdk_1.createStep)("delete-role", async ({ roleId }, context) => {
    const rbacModuleService = context.container.resolve(rbac_1.RBAC_MODULE);
    await rbacModuleService.deleteRbacRoles({
        id: roleId
    });
    return new workflows_sdk_1.StepResponse(`Role has been deleted`);
});
const deleteRoleWorkflow = (0, workflows_sdk_1.createWorkflow)("delete-role", function (input) {
    const linksToDismiss = (0, workflows_sdk_1.transform)({ input }, (data) => data.input.impactedUserIds.map((item) => {
        return {
            [utils_1.Modules.USER]: {
                user_id: item
            },
            "rbacModuleService": {
                rbac_role_id: data.input.roleId
            }
        };
    }));
    (0, core_flows_1.dismissRemoteLinkStep)(linksToDismiss);
    stepDeleteRole(input);
    return new workflows_sdk_1.WorkflowResponse({});
});
exports.default = deleteRoleWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLXJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2RlbGV0ZS1yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBTTBDO0FBQzFDLDBDQUE2QztBQUM3Qyw0REFBb0U7QUFDcEUscURBQW9EO0FBT3BELE1BQU0sY0FBYyxHQUFHLElBQUEsMEJBQVUsRUFBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFjLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFFekYsTUFBTSxpQkFBaUIsR0FBc0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQ3BFLGtCQUFXLENBQ1osQ0FBQztJQUVGLE1BQU0saUJBQWlCLENBQUMsZUFBZSxDQUFDO1FBQ3RDLEVBQUUsRUFBRSxNQUFNO0tBQ1gsQ0FBQyxDQUFBO0lBRUYsT0FBTyxJQUFJLDRCQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtBQUNsRCxDQUFDLENBQUMsQ0FBQTtBQU9GLE1BQU0sa0JBQWtCLEdBQUcsSUFBQSw4QkFBYyxFQUN2QyxhQUFhLEVBQ2IsVUFBVSxLQUFzQjtJQUU5QixNQUFNLGNBQWMsR0FBRyxJQUFBLHlCQUFTLEVBQzlCLEVBQUUsS0FBSyxFQUFFLEVBQ1QsQ0FBRSxJQUFJLEVBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2xELE9BQU87WUFDTCxDQUFDLGVBQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDZCxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ25CLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07YUFDaEM7U0FDRixDQUFBO0lBQUEsQ0FBQyxDQUNILENBQ0YsQ0FBQTtJQUNELElBQUEsa0NBQXFCLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDdEMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXRCLE9BQU8sSUFBSSxnQ0FBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNqQyxDQUFDLENBQ0YsQ0FBQTtBQUVELGtCQUFlLGtCQUFrQixDQUFBIn0=