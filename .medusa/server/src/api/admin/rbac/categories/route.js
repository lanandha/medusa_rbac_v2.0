"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const rbac_1 = require("../../../../modules/rbac");
const utils_1 = require("@medusajs/framework/utils");
const types_1 = require("../../../../modules/rbac/types");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const type = req.query.type;
    const query = type ? { type: type } : {};
    const categories = await rbacModuleService.listRbacPermissionCategories(query, {
        relations: ["permissions"]
    });
    res.json(categories);
};
exports.GET = GET;
const POST = async (req, res) => {
    const rawRequest = req;
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const currentCategories = await rbacModuleService.listRbacPermissionCategories();
    if (currentCategories && currentCategories.find(cat => cat.name === rawRequest.body.name)) {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Category already exists");
    }
    else {
        const newCategory = await rbacModuleService.createRbacPermissionCategories({
            name: rawRequest.body.name,
            type: types_1.PermissionCategoryType.CUSTOM
        });
        if (newCategory) {
            res.json(newCategory);
        }
        else {
            throw new utils_1.MedusaError(utils_1.MedusaError.Types.INVALID_DATA, "Error when creating category");
        }
    }
};
exports.POST = POST;
const DELETE = async (req, res) => {
    const rawRequest = req;
    const deletePermission = rawRequest.body;
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    await rbacModuleService.deleteRbacPermissionCategories({
        id: deletePermission.id
    });
    res.json({});
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvY2F0ZWdvcmllcy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxtREFBc0Q7QUFFdEQscURBQXdEO0FBQ3hELDBEQUF3RTtBQUVqRSxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFDRixNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUQsa0JBQVcsQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUE4QixDQUFDO0lBRXRELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUV6QyxNQUFNLFVBQVUsR0FBRyxNQUFNLGlCQUFpQixDQUFDLDRCQUE0QixDQUFDLEtBQUssRUFDM0U7UUFDRSxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDM0IsQ0FDRixDQUFBO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUE7QUFuQlksUUFBQSxHQUFHLE9BbUJmO0FBRU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxVQUFVLEdBQUcsR0FBcUIsQ0FBQztJQUV6QyxNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUQsa0JBQVcsQ0FDWixDQUFDO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGlCQUFpQixDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFFakYsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxRixNQUFNLElBQUksbUJBQVcsQ0FDbkIsbUJBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUM3Qix5QkFBeUIsQ0FDMUIsQ0FBQTtJQUNILENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxXQUFXLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQztZQUN6RSxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQzFCLElBQUksRUFBRSw4QkFBc0IsQ0FBQyxNQUFNO1NBQ3BDLENBQUMsQ0FBQTtRQUVGLElBQUksV0FBVyxFQUFFLENBQUM7WUFDaEIsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QixDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sSUFBSSxtQkFBVyxDQUNuQixtQkFBVyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQzlCLDhCQUE4QixDQUMvQixDQUFBO1FBQ0gsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUE7QUFqQ1ksUUFBQSxJQUFJLFFBaUNoQjtBQUVNLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFDekIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQU1GLE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7SUFDekMsTUFBTSxnQkFBZ0IsR0FBSSxVQUFVLENBQUMsSUFBNkIsQ0FBQztJQUVuRSxNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUQsa0JBQVcsQ0FDWixDQUFDO0lBQ0YsTUFBTSxpQkFBaUIsQ0FBQyw4QkFBOEIsQ0FBQztRQUNyRCxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsRUFBRTtLQUN4QixDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyxDQUFBO0FBcEJZLFFBQUEsTUFBTSxVQW9CbEIifQ==