"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.POST = exports.GET = void 0;
const rbac_1 = require("../../../../modules/rbac");
const create_permission_1 = __importDefault(require("../../../../workflows/create-permission"));
const utils_1 = require("@medusajs/framework/utils");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    const type = req.query.type;
    const query = type ? { type: type } : {};
    const permissions = await rbacModuleService.listRbacPermissions(query, {
        relations: ["policies", "category"]
    });
    res.json(permissions);
};
exports.GET = GET;
const POST = async (req, res) => {
    const rawRequest = req;
    const { result } = await (0, create_permission_1.default)(req.scope)
        .run({
        input: {
            permission: rawRequest.body
        }
    });
    if (result.permission) {
        res.json(result);
    }
    else {
        throw new utils_1.MedusaError(utils_1.MedusaError.Types.NOT_ALLOWED, "Permission already exists");
    }
};
exports.POST = POST;
const DELETE = async (req, res) => {
    const rawRequest = req;
    const deletePermission = rawRequest.body;
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    await rbacModuleService.deleteRbacPermissions({
        id: deletePermission.id
    });
    res.json({});
};
exports.DELETE = DELETE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvcGVybWlzc2lvbnMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsbURBQXNEO0FBR3RELGdHQUErRTtBQUMvRSxxREFBd0Q7QUFFakQsTUFBTSxHQUFHLEdBQUcsS0FBSyxFQUN0QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxpQkFBaUIsR0FBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVELGtCQUFXLENBQ1osQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBc0IsQ0FBQztJQUU5QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7UUFDckUsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztLQUNwQyxDQUFDLENBQUE7SUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQWhCWSxRQUFBLEdBQUcsT0FnQmY7QUFFTSxNQUFNLElBQUksR0FBRyxLQUFLLEVBQ3ZCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBRXpDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsMkJBQXdCLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUN6RCxHQUFHLENBQUM7UUFDSCxLQUFLLEVBQUU7WUFDTCxVQUFVLEVBQUUsVUFBVSxDQUFDLElBQUk7U0FDNUI7S0FDRixDQUFDLENBQUE7SUFFSixJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxJQUFJLG1CQUFXLENBQ25CLG1CQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFDN0IsMkJBQTJCLENBQzVCLENBQUE7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBdEJZLFFBQUEsSUFBSSxRQXNCaEI7QUFFTSxNQUFNLE1BQU0sR0FBRyxLQUFLLEVBQ3pCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFNRixNQUFNLFVBQVUsR0FBRyxHQUFxQixDQUFDO0lBQ3pDLE1BQU0sZ0JBQWdCLEdBQUksVUFBVSxDQUFDLElBQTZCLENBQUM7SUFFbkUsTUFBTSxpQkFBaUIsR0FBc0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzVELGtCQUFXLENBQ1osQ0FBQztJQUNGLE1BQU0saUJBQWlCLENBQUMscUJBQXFCLENBQUM7UUFDNUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLEVBQUU7S0FDeEIsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNmLENBQUMsQ0FBQTtBQXBCWSxRQUFBLE1BQU0sVUFvQmxCIn0=