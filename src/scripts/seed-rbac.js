"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedRbacData;
const utils_1 = require("@medusajs/utils");
const types_1 = require("../modules/rbac/types");
const create_permission_category_1 = __importDefault(require("../workflows/create-permission-category"));
const create_permissions_1 = __importDefault(require("../workflows/create-permissions"));
const PREDEFINED_CATEGORIES = [
    {
        name: 'Orders',
        type: types_1.PermissionCategoryType.PREDEFINED,
        permissions: []
    },
    {
        name: 'Products',
        type: types_1.PermissionCategoryType.PREDEFINED,
        permissions: []
    },
    {
        name: 'Customers',
        type: types_1.PermissionCategoryType.PREDEFINED,
        permissions: []
    },
];
const PREDEFINED_PERMISSIONS_ORDERS = [
    {
        name: 'READ Orders',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/orders',
        actionType: types_1.ActionType.READ,
        policies: []
    },
    {
        name: 'WRITE Orders',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/orders',
        actionType: types_1.ActionType.WRITE,
        policies: []
    },
    {
        name: 'DELETE Orders',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/orders',
        actionType: types_1.ActionType.DELETE,
        policies: []
    },
];
const PREDEFINED_PERMISSIONS_PRODUCTS = [
    {
        name: 'READ Products',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/products',
        actionType: types_1.ActionType.READ,
        policies: []
    },
    {
        name: 'WRITE Products',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/products',
        actionType: types_1.ActionType.WRITE,
        policies: []
    },
    {
        name: 'DELETE Products',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/products',
        actionType: types_1.ActionType.DELETE,
        policies: []
    },
];
const PREDEFINED_PERMISSIONS_CUSTOMERS = [
    {
        name: 'READ Customers',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/customers',
        actionType: types_1.ActionType.READ,
        policies: []
    },
    {
        name: 'WRITE Customers',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/customers',
        actionType: types_1.ActionType.WRITE,
        policies: []
    },
    {
        name: 'DELETE Customers',
        type: types_1.PermissionType.PREDEFINED,
        matcherType: types_1.PermissionMatcherType.API,
        matcher: '/admin/customers',
        actionType: types_1.ActionType.DELETE,
        policies: []
    },
];
async function seedRbacData({ container }) {
    const logger = container.resolve(utils_1.ContainerRegistrationKeys.LOGGER);
    logger.info("Start seeding rbac permissions");
    await (0, create_permission_category_1.default)(container).run({
        input: {
            categories: PREDEFINED_CATEGORIES
        }
    });
    const permissionsToCreate = PREDEFINED_CATEGORIES.flatMap((category) => {
        switch (category.name) {
            case 'Orders':
                return PREDEFINED_PERMISSIONS_ORDERS.map(pred => {
                    return {
                        ...pred,
                        category: category.id
                    };
                });
            case 'Products':
                return PREDEFINED_PERMISSIONS_PRODUCTS.map(pred => {
                    return {
                        ...pred,
                        category: category.id
                    };
                });
            case 'Customers':
                return PREDEFINED_PERMISSIONS_CUSTOMERS.map(pred => {
                    return {
                        ...pred,
                        category: category.id
                    };
                });
        }
    });
    await (0, create_permissions_1.default)(container).run({
        input: {
            permissions: permissionsToCreate.filter(permissionToCreate => permissionToCreate !== undefined)
        }
    });
    logger.info("Finished seeding rbac permissions");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZC1yYmFjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NjcmlwdHMvc2VlZC1yYmFjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBK0dBLCtCQWdEQztBQTNKRCwyQ0FFeUI7QUFFekIsaURBQW1LO0FBQ25LLHlHQUF1RjtBQUN2Rix5RkFBd0U7QUFFeEUsTUFBTSxxQkFBcUIsR0FBOEM7SUFDdkU7UUFDRSxJQUFJLEVBQUUsUUFBUTtRQUNkLElBQUksRUFBRSw4QkFBc0IsQ0FBQyxVQUFVO1FBQ3ZDLFdBQVcsRUFBRSxFQUFFO0tBQ2hCO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJLEVBQUUsOEJBQXNCLENBQUMsVUFBVTtRQUN2QyxXQUFXLEVBQUUsRUFBRTtLQUNoQjtJQUNEO1FBQ0UsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSSxFQUFFLDhCQUFzQixDQUFDLFVBQVU7UUFDdkMsV0FBVyxFQUFFLEVBQUU7S0FDaEI7Q0FDRixDQUFBO0FBRUQsTUFBTSw2QkFBNkIsR0FBc0M7SUFDdkU7UUFDRSxJQUFJLEVBQUUsYUFBYTtRQUNuQixJQUFJLEVBQUUsc0JBQWMsQ0FBQyxVQUFVO1FBQy9CLFdBQVcsRUFBRSw2QkFBcUIsQ0FBQyxHQUFHO1FBQ3RDLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFVBQVUsRUFBRSxrQkFBVSxDQUFDLElBQUk7UUFDM0IsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNEO1FBQ0UsSUFBSSxFQUFFLGNBQWM7UUFDcEIsSUFBSSxFQUFFLHNCQUFjLENBQUMsVUFBVTtRQUMvQixXQUFXLEVBQUUsNkJBQXFCLENBQUMsR0FBRztRQUN0QyxPQUFPLEVBQUUsZUFBZTtRQUN4QixVQUFVLEVBQUUsa0JBQVUsQ0FBQyxLQUFLO1FBQzVCLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRDtRQUNFLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxzQkFBYyxDQUFDLFVB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