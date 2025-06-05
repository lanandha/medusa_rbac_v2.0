"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = void 0;
const rbac_1 = require("../../../../../modules/rbac");
const utils_1 = require("@medusajs/framework/utils");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rawRequest = req;
    const roleId = rawRequest.params.id;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [roleWithUsers], } = await query.graph({
        entity: "rbac_role",
        filters: {
            id: [
                roleId
            ]
        },
        fields: [
            "*",
            "users.*",
        ],
    });
    const role = await rbacModuleService.retrieveRbacRole(roleId, {
        relations: ["policies", "policies.permission", "policies.permission.category"]
    });
    res.json({
        role: role,
        users: roleWithUsers.users
    });
};
exports.GET = GET;
const POST = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rawRequest = req;
    const updatedRole = await rbacModuleService.updateRbacRoles({
        id: rawRequest.body.id,
        name: rawRequest.body.name
    });
    res.json(updatedRole);
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvcm9sZXMvW2lkXS9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxzREFBeUQ7QUFFekQscURBQXNFO0FBRS9ELE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0saUJBQWlCLEdBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM1RCxrQkFBVyxDQUNaLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBQ3pDLE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO0lBRXBDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FDdEIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFO2dCQUNGLE1BQU07YUFDUDtTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sR0FBRztZQUNILFNBQVM7U0FDVjtLQUNGLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUMxRDtRQUNFLFNBQVMsRUFBRSxDQUFDLFVBQVUsRUFBRSxxQkFBcUIsRUFBRSw4QkFBOEIsQ0FBQztLQUMvRSxDQUNGLENBQUM7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ1AsSUFBSSxFQUFFLElBQUk7UUFDVixLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUs7S0FDM0IsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBdENZLFFBQUEsR0FBRyxPQXNDZjtBQUVNLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUVGLE1BQU0saUJBQWlCLEdBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM1RCxrQkFBVyxDQUNaLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBRXpDLE1BQU0sV0FBVyxHQUFHLE1BQU0saUJBQWlCLENBQUMsZUFBZSxDQUFDO1FBQzFELEVBQUUsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdEIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSTtLQUMzQixDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQWpCWSxRQUFBLElBQUksUUFpQmhCIn0=