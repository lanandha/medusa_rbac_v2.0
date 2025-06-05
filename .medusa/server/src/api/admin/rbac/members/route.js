"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const rbac_1 = require("../../../../modules/rbac");
const utils_1 = require("@medusajs/framework/utils");
const GET = async (req, res) => {
    const userModuleService = req.scope.resolve(utils_1.Modules.USER);
    const users = await userModuleService.listUsers();
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: rolesWithUsers, } = await query.graph({
        entity: "rbac_role",
        fields: [
            "*",
            "users.*",
        ],
    });
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rbacRoles = await rbacModuleService.listRbacRoles({}, {
        relations: ["policies"]
    });
    const rbacRolesToUser = rolesWithUsers.map(ru => {
        const rbacRoleFound = rbacRoles.find(ru => ru.id);
        return {
            role: {
                id: ru.id,
                name: ru.name,
                policies: rbacRoleFound ? rbacRoleFound.policies : []
            },
            users: ru.users
        };
    });
    const usersToRbacRole = [];
    for (const user of users) {
        const rbacRoleToUserForUser = rbacRolesToUser.find(rbacRu => rbacRu.users.find(rbacUser => rbacUser.id === user.id));
        usersToRbacRole.push({
            user: user,
            role: rbacRoleToUserForUser ? rbacRoleToUserForUser.role : undefined
        });
    }
    res.json(usersToRbacRole);
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvbWVtYmVycy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxtREFBc0Q7QUFHdEQscURBQStFO0FBR3hFLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0saUJBQWlCLEdBQXdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM5RCxlQUFPLENBQUMsSUFBSSxDQUNiLENBQUM7SUFFRixNQUFNLEtBQUssR0FBYyxNQUFNLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRTdELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsY0FBYyxHQUNyQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQixNQUFNLEVBQUUsV0FBVztRQUNuQixNQUFNLEVBQUU7WUFDTixHQUFHO1lBQ0gsU0FBUztTQUNWO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxpQkFBaUIsR0FBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVELGtCQUFXLENBQ1osQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE1BQU0saUJBQWlCLENBQUMsYUFBYSxDQUNyRCxFQUVDLEVBQ0Q7UUFDRSxTQUFTLEVBQUUsQ0FBQyxVQUFVLENBQUM7S0FDeEIsQ0FDRixDQUFDO0lBT0YsTUFBTSxlQUFlLEdBQXFCLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDaEUsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRCxPQUFPO1lBQ0wsSUFBSSxFQUFFO2dCQUNKLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUk7Z0JBQ2IsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUN0RDtZQUNELEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSztTQUNoQixDQUFBO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFPRixNQUFNLGVBQWUsR0FBcUIsRUFBRSxDQUFDO0lBRTdDLEtBQUssTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7UUFDekIsTUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JILGVBQWUsQ0FBQyxJQUFJLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztTQUNyRSxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM1QixDQUFDLENBQUE7QUFwRVksUUFBQSxHQUFHLE9Bb0VmIn0=