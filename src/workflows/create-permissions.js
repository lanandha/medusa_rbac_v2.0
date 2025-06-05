"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const rbac_1 = require("../modules/rbac");
const stepCreate = (0, workflows_sdk_1.createStep)("create", async ({ permissions }, context) => {
    const rbacModuleService = context.container.resolve(rbac_1.RBAC_MODULE);
    const logger = context.container.resolve("logger");
    const results = await rbacModuleService.listRbacPermissions();
    logger.info(`Current rbac permissions: ${JSON.stringify(results)}`);
    const permissionsToCreate = permissions.filter(permission => {
        return !results.find(result => {
            return (result.matcher === permission.matcher &&
                result.matcherType === permission.matcherType &&
                result.actionType === permission.actionType);
        });
    });
    logger.info(`Rbac permissions to create: ${JSON.stringify(permissionsToCreate)}`);
    const rbacPermissions = await rbacModuleService.createRbacPermissions(permissionsToCreate.map(perm => {
        return {
            ...perm,
            policies: []
        };
    }));
    if (rbacPermissions) {
        if (permissionsToCreate.length < permissions.length) {
            logger.info(`Permissions has been created. Some of them already existed.`);
            return new workflows_sdk_1.StepResponse(`Permissions has been created. Some of them already existed.`);
        }
        else {
            logger.info(`Permissions has been created.`);
            return new workflows_sdk_1.StepResponse(`Permissions has been created.`);
        }
    }
    logger.info(`Permissions has NOT been created`);
    return new workflows_sdk_1.StepResponse(`Permissions has NOT been created`);
});
const createPermissionsWorkflow = (0, workflows_sdk_1.createWorkflow)("create-permissions", function (input) {
    const result = stepCreate(input);
    return new workflows_sdk_1.WorkflowResponse({
        message: result,
    });
});
exports.default = createPermissionsWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBlcm1pc3Npb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3dvcmtmbG93cy9jcmVhdGUtcGVybWlzc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFNMEM7QUFHMUMsMENBQTZDO0FBTzdDLE1BQU0sVUFBVSxHQUFHLElBQUEsMEJBQVUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUUsV0FBVyxFQUEyQixFQUFFLE9BQU8sRUFBRSxFQUFFO0lBRWxHLE1BQU0saUJBQWlCLEdBQ3JCLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGtCQUFXLENBQUMsQ0FBQztJQUV6QyxNQUFNLE1BQU0sR0FBVyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUUxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFFOUQsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFbkUsTUFBTSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzVCLE9BQU8sQ0FDTCxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxPQUFPO2dCQUNyQyxNQUFNLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxXQUFXO2dCQUM3QyxNQUFNLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxVQUFVLENBQzVDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUVqRixNQUFNLGVBQWUsR0FBRyxNQUFNLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuRyxPQUFPO1lBQ0wsR0FBRyxJQUFJO1lBQ1AsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNKLElBQUksZUFBZSxFQUFFLENBQUM7UUFDcEIsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsNkRBQTZELENBQUMsQ0FBQztZQUMzRSxPQUFPLElBQUksNEJBQVksQ0FBQyw2REFBNkQsQ0FBQyxDQUFBO1FBQ3hGLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBSSw0QkFBWSxDQUFDLCtCQUErQixDQUFDLENBQUE7UUFDMUQsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDaEQsT0FBTyxJQUFJLDRCQUFZLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0seUJBQXlCLEdBQUcsSUFBQSw4QkFBYyxFQUM5QyxvQkFBb0IsRUFDcEIsVUFBVSxLQUE2QjtJQUNyQyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEMsT0FBTyxJQUFJLGdDQUFnQixDQUFDO1FBQzFCLE9BQU8sRUFBRSxNQUFNO0tBQ2hCLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FDRixDQUFBO0FBRUQsa0JBQWUseUJBQXlCLENBQUEifQ==