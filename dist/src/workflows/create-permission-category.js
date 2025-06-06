"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workflows_sdk_1 = require("@medusajs/framework/workflows-sdk");
const rbac_1 = require("../modules/rbac");
const stepCreate = (0, workflows_sdk_1.createStep)("create", async ({ categories }, context) => {
    const rbacModuleService = context.container.resolve(rbac_1.RBAC_MODULE);
    const logger = context.container.resolve("logger");
    const results = await rbacModuleService.listAndCountRbacPermissionCategories();
    logger.info(`Current rbac permissions categories: ${JSON.stringify(results)}`);
    const categoriesToCreate = categories.filter(category => {
        return !results[0].find(result => result.name !== category.name);
    });
    logger.info(`Rbac permissions categories to create: ${JSON.stringify(categoriesToCreate)}`);
    const rbacPermissionCategories = await rbacModuleService.createRbacPermissionCategories(categoriesToCreate.map(cat => {
        return {
            ...cat,
            permissions: []
        };
    }));
    if (rbacPermissionCategories) {
        if (categoriesToCreate.length < categories.length) {
            logger.info(`Permissions categories has been created. Some of them already existed.`);
        }
        else {
            logger.info(`Permissions categories has been created.`);
        }
    }
    return new workflows_sdk_1.StepResponse([...rbacPermissionCategories, ...results[0]]);
});
const createPermissionCategoryWorkflow = (0, workflows_sdk_1.createWorkflow)("create-permission-category", function (input) {
    const result = stepCreate(input);
    return new workflows_sdk_1.WorkflowResponse(result);
});
exports.default = createPermissionCategoryWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXBlcm1pc3Npb24tY2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvd29ya2Zsb3dzL2NyZWF0ZS1wZXJtaXNzaW9uLWNhdGVnb3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUVBSzBDO0FBRzFDLDBDQUE2QztBQU83QyxNQUFNLFVBQVUsR0FBRyxJQUFBLDBCQUFVLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBa0MsRUFBRSxPQUFPLEVBQUUsRUFBRTtJQUV4RyxNQUFNLGlCQUFpQixHQUNyQixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxrQkFBVyxDQUFDLENBQUE7SUFFeEMsTUFBTSxNQUFNLEdBQVcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFMUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxvQ0FBb0MsRUFBRSxDQUFDO0lBRS9FLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBRTlFLE1BQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN0RCxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUUzRixNQUFNLHdCQUF3QixHQUFHLE1BQU0saUJBQWlCLENBQUMsOEJBQThCLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ25ILE9BQU87WUFDTCxHQUFHLEdBQUc7WUFDTixXQUFXLEVBQUUsRUFBRTtTQUNoQixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVKLElBQUksd0JBQXdCLEVBQUUsQ0FBQztRQUM3QixJQUFJLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEQsTUFBTSxDQUFDLElBQUksQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1FBQzFELENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxJQUFJLDRCQUFZLENBQUMsQ0FBQyxHQUFHLHdCQUF3QixFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN2RSxDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sZ0NBQWdDLEdBQUcsSUFBQSw4QkFBYyxFQUNyRCw0QkFBNEIsRUFDNUIsVUFBVSxLQUFvQztJQUM1QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEMsT0FBTyxJQUFJLGdDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FDRixDQUFBO0FBRUQsa0JBQWUsZ0NBQWdDLENBQUEifQ==