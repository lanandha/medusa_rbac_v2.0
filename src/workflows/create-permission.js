"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const rbac_1 = require("../modules/rbac");
const stepCreate = (0, workflows_sdk_1.createStep)("create", async ({ permission }, context) => {
    const rbacModuleService = context.container.resolve(rbac_1.RBAC_MODULE);
    const logger = context.container.resolve("logger");
    const results = await rbacModuleService.listAndCountRbacPermissions();
    const isPermissionExists = results[0].find(result => {
        return (result.matcher === permission.matcher &&
            result.matcherType === permission.matcherType &&
            result.actionType === permission.actionType);
    });
    if (isPermissionExists) {
        logger.error(`Permission has NOT been created. It already exists.`);
        return new workflows_sdk_1.StepResponse(undefined);
    }
    logger.info(`Rbac permission to create: ${JSON.stringify(permission)}`);
    const rbacPermission = await rbacModuleService.createRbacPermissions({
        ...permission,
        policies: [],
        category: permission.category?.id
    });
    if (rbacPermission) {
        return new workflows_sdk_1.StepResponse(rbacPermission);
    }
    logger.error(`Permission has NOT been created`);
    return new workflows_sdk_1.StepResponse(undefined);
});
const createPermissionWorkflow = (0, workflows_sdk_1.createWorkflow)("create-permission", function (input) {
    const result = stepCreate(input);
    return new workflows_sdk_1.WorkflowResponse({
        permission: result,
    });
});
exports.default = createPermissionWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBlcm1pc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NyZWF0ZS1wZXJtaXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBTTBDO0FBRzFDLDBDQUE2QztBQU83QyxNQUFNLFVBQVUsR0FBRyxJQUFBLDBCQUFVLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMEIsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUVoRyxNQUFNLGlCQUFpQixHQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQkFBVyxDQUFDLENBQUM7SUFFekMsTUFBTSxNQUFNLEdBQVcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO0lBRXRFLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNsRCxPQUFPLENBQ0wsTUFBTSxDQUFDLE9BQU8sS0FBSyxVQUFVLENBQUMsT0FBTztZQUNyQyxNQUFNLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxXQUFXO1lBQzdDLE1BQU0sQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLFVBQVUsQ0FDNUMsQ0FBQTtJQUNILENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMscURBQXFELENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksNEJBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUE7SUFFdkUsTUFBTSxjQUFjLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQztRQUNuRSxHQUFHLFVBQVU7UUFDYixRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUU7S0FDbEMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNuQixPQUFPLElBQUksNEJBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ2hELE9BQU8sSUFBSSw0QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBRUYsTUFBTSx3QkFBd0IsR0FBRyxJQUFBLDhCQUFjLEVBQzdDLG1CQUFtQixFQUNuQixVQUFVLEtBQTRCO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoQyxPQUFPLElBQUksZ0NBQWdCLENBQUM7UUFDMUIsVUFBVSxFQUFFLE1BQU07S0FDbkIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUNGLENBQUE7QUFFRCxrQkFBZSx3QkFBd0IsQ0FBQSJ9