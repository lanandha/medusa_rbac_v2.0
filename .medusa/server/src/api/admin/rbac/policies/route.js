"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const rbac_1 = require("../../../../modules/rbac");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const policies = await rbacModuleService.listRbacPolicies();
    res.json(policies);
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvcG9saWNpZXMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsbURBQXNEO0FBRy9DLE1BQU0sR0FBRyxHQUFHLEtBQUssRUFDdEIsR0FBa0IsRUFDbEIsR0FBbUIsRUFDbkIsRUFBRTtJQUNGLE1BQU0saUJBQWlCLEdBQXNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUM1RCxrQkFBVyxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFFNUQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUE7QUFYWSxRQUFBLEdBQUcsT0FXZiJ9