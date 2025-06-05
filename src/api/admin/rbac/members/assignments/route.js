"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const assign_role_1 = __importDefault(require("../../../../../workflows/assign-role"));
const utils_1 = require("@medusajs/framework/utils");
const POST = async (req, res) => {
    const rawRequest = req;
    const userModuleService = req.scope.resolve(utils_1.Modules.USER);
    const user = await userModuleService.retrieveUser(rawRequest.body.userId);
    if (user) {
        const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
        const { data: rolesWithUsers, } = await query.graph({
            entity: "rbac_role",
            fields: [
                "*",
                "users.*",
            ],
        });
        const existingRole = rolesWithUsers.find(ru => ru.users.find(u => u.id === rawRequest.body.userId));
        await (0, assign_role_1.default)(req.scope)
            .run({
            input: {
                oldRoleId: existingRole !== undefined ? existingRole.id : undefined,
                newRoleId: rawRequest.body.roleId,
                userId: rawRequest.body.userId
            }
        });
    }
    res.json({});
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvbWVtYmVycy9hc3NpZ25tZW50cy9yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSx1RkFBNEU7QUFDNUUscURBQStFO0FBR3hFLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUVGLE1BQU0sVUFBVSxHQUFHLEdBQXFCLENBQUM7SUFFekMsTUFBTSxpQkFBaUIsR0FBd0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlELGVBQU8sQ0FBQyxJQUFJLENBQ2IsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFZLE1BQU0saUJBQWlCLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkYsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUVULE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlDQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWhFLE1BQU0sRUFDSixJQUFJLEVBQUUsY0FBYyxHQUNyQixHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNwQixNQUFNLEVBQUUsV0FBVztZQUNuQixNQUFNLEVBQUU7Z0JBQ04sR0FBRztnQkFDSCxTQUFTO2FBQ1Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNwRyxNQUFNLElBQUEscUJBQXdCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUN0QyxHQUFHLENBQUM7WUFDSCxLQUFLLEVBQUU7Z0JBQ0wsU0FBUyxFQUFFLFlBQVksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQ25FLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ2pDLE1BQU0sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU07YUFDL0I7U0FDRixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQTtBQXJDWSxRQUFBLElBQUksUUFxQ2hCIn0=