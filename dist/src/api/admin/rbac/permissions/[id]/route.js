"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const rbac_1 = require("../../../../../modules/rbac");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rawRequest = req;
    const permissionId = rawRequest.params.id;
    const permission = await rbacModuleService.retrieveRbacPermission(permissionId, {
        relations: ["category"]
    });
    res.json({
        permission: permission,
    });
};
exports.GET = GET;
const POST = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rawRequest = req;
    const updatedPermission = await rbacModuleService.updateRbacPermissions({
        id: rawRequest.body.id,
        name: rawRequest.body.name
    });
    res.json(updatedPermission);
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvcGVybWlzc2lvbnMvW2lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxzREFBeUQ7QUFHbEQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxpQkFBaUIsR0FBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVELGtCQUFXLENBQ1osQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7SUFDekMsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFFMUMsTUFBTSxVQUFVLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQzVFO1FBQ0UsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO0tBQ3hCLENBQ0YsQ0FBQztJQUVGLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDUCxVQUFVLEVBQUUsVUFBVTtLQUN2QixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUE7QUFwQlksUUFBQSxHQUFHLE9Bb0JmO0FBRU0sTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBRUYsTUFBTSxpQkFBaUIsR0FBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVELGtCQUFXLENBQ1osQ0FBQztJQUVGLE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7SUFFekMsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDO1FBQ3RFLEVBQUUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSTtLQUMzQixDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDOUIsQ0FBQyxDQUFBO0FBakJZLFFBQUEsSUFBSSxRQWlCaEIifQ==