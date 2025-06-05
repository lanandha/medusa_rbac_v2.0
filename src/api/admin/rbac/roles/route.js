"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const rbac_1 = require("../../../../modules/rbac");
const delete_role_1 = __importDefault(require("../../../../workflows/delete-role"));
const utils_1 = require("@medusajs/framework/utils");
const GET = async (req, res) => {
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: rolesWithUsers, } = await query.graph({
        entity: "rbac_role",
        fields: [
            "*",
            "policies.*",
            "policies.permission.*",
            "users.*",
        ],
    });
    res.json(rolesWithUsers);
};
exports.GET = GET;
const POST = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const rawRequest = req;
    const newRole = await rbacModuleService.addRole(rawRequest.body);
    res.json(newRole);
};
exports.POST = POST;
const DELETE = async (req, res) => {
    const rawRequest = req;
    const deleteRole = rawRequest.body;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: [roleWithUsers], } = await query.graph({
        entity: "rbac_role",
        filters: {
            id: [
                deleteRole.id
            ]
        },
        fields: [
            "*",
            "users.*",
        ],
    });
    await (0, delete_role_1.default)(req.scope)
        .run({
        input: {
            roleId: deleteRole.id,
            impactedUserIds: roleWithUsers.users.map(user => user.id)
        }
    });
    res.json({});
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvcm9sZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsbURBQXNEO0FBR3RELG9GQUFtRTtBQUNuRSxxREFBc0U7QUFFL0QsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUNBQXlCLENBQUMsS0FBSyxDQUFDLENBQUE7SUFFaEUsTUFBTSxFQUNKLElBQUksRUFBRSxjQUFjLEdBQ3JCLEdBQUcsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxXQUFXO1FBQ25CLE1BQU0sRUFBRTtZQUNOLEdBQUc7WUFDSCxZQUFZO1lBQ1osdUJBQXVCO1lBQ3ZCLFNBQVM7U0FDVjtLQUNGLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFBO0FBbkJZLFFBQUEsR0FBRyxPQW1CZjtBQUVNLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUdGLE1BQU0saUJBQWlCLEdBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM1RCxrQkFBVyxDQUNaLENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBRXpDLE1BQU0sT0FBTyxHQUFHLE1BQU0saUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFpQyxDQUFDLENBQUM7SUFFOUYsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixDQUFDLENBQUE7QUFmWSxRQUFBLElBQUksUUFlaEI7QUFFTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQ3pCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFNRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBQ3pDLE1BQU0sVUFBVSxHQUFJLFVBQVUsQ0FBQyxJQUF1QixDQUFDO0lBRXZELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FDdEIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsT0FBTyxFQUFFO1lBQ1AsRUFBRSxFQUFFO2dCQUNGLFVBQVUsQ0FBQyxFQUFFO2FBQ2Q7U0FDRjtRQUNELE1BQU0sRUFBRTtZQUNOLEdBQUc7WUFDSCxTQUFTO1NBQ1Y7S0FDRixDQUFDLENBQUM7SUFFSCxNQUFNLElBQUEscUJBQWtCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNoQyxHQUFHLENBQUM7UUFDSCxLQUFLLEVBQUU7WUFDTCxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQUU7WUFDckIsZUFBZSxFQUFFLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUMxRDtLQUNGLENBQUMsQ0FBQTtJQUVKLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZixDQUFDLENBQUE7QUF0Q1ksUUFBQSxNQUFNLFVBc0NsQiJ9