"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const rbac_1 = require("../modules/rbac");
const core_flows_1 = require("@medusajs/medusa/core-flows");
const utils_1 = require("@medusajs/framework/utils");
const assignRoleToUserWorkflow = (0, workflows_sdk_1.createWorkflow)("assign-role-to-user", function (input) {
    (0, workflows_sdk_1.when)(input, (input) => {
        return input.oldRoleId !== undefined;
    }).then(() => {
        (0, core_flows_1.dismissRemoteLinkStep)([{
                [utils_1.Modules.USER]: {
                    user_id: input.userId
                },
                [rbac_1.RBAC_MODULE]: {
                    rbac_role_id: input.oldRoleId
                }
            }]);
    });
    (0, core_flows_1.createRemoteLinkStep)([{
            [utils_1.Modules.USER]: {
                user_id: input.userId
            },
            [rbac_1.RBAC_MODULE]: {
                rbac_role_id: input.newRoleId
            }
        }]);
    return new workflows_sdk_1.WorkflowResponse({});
});
exports.default = assignRoleToUserWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzaWduLXJvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2Fzc2lnbi1yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBSTBDO0FBQzFDLDBDQUE2QztBQUM3Qyw0REFBZ0g7QUFDaEgscURBQW9EO0FBUXBELE1BQU0sd0JBQXdCLEdBQUcsSUFBQSw4QkFBYyxFQUM3QyxxQkFBcUIsRUFDckIsVUFBVSxLQUE0QjtJQUVwQyxJQUFBLG9CQUFJLEVBQ0YsS0FBSyxFQUNMLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixPQUFPLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDO0lBQ3ZDLENBQUMsQ0FDRixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixJQUFBLGtDQUFxQixFQUFDLENBQUM7Z0JBQ3JCLENBQUMsZUFBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNkLE9BQU8sRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDdEI7Z0JBQ0QsQ0FBQyxrQkFBVyxDQUFDLEVBQUU7b0JBQ2IsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTO2lCQUM5QjthQUNGLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGlDQUFvQixFQUFDLENBQUM7WUFDcEIsQ0FBQyxlQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNO2FBQ3RCO1lBQ0QsQ0FBQyxrQkFBVyxDQUFDLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLEtBQUssQ0FBQyxTQUFTO2FBQzlCO1NBQ0YsQ0FBQyxDQUFDLENBQUE7SUFFSCxPQUFPLElBQUksZ0NBQWdCLENBQUMsRUFBRSxDQUFDLENBQUE7QUFDakMsQ0FBQyxDQUNGLENBQUE7QUFFRCxrQkFBZSx3QkFBd0IsQ0FBQSJ9