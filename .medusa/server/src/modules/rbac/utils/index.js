"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertApiMethodToRbacAction = convertApiMethodToRbacAction;
const types_1 = require("../types");
function convertApiMethodToRbacAction(apiMethod) {
    switch (apiMethod.toUpperCase()) {
        case 'GET':
            return types_1.ActionType.READ;
        case 'POST':
        case 'PUT':
            return types_1.ActionType.WRITE;
        case 'DELETE':
            return types_1.ActionType.DELETE;
        default:
            return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYmFjL3V0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsb0VBWUM7QUFkRCxvQ0FBc0M7QUFFdEMsU0FBZ0IsNEJBQTRCLENBQUMsU0FBaUI7SUFDNUQsUUFBUSxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztRQUNoQyxLQUFLLEtBQUs7WUFDUixPQUFPLGtCQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3pCLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxLQUFLO1lBQ1IsT0FBTyxrQkFBVSxDQUFDLEtBQUssQ0FBQztRQUMxQixLQUFLLFFBQVE7WUFDWCxPQUFPLGtCQUFVLENBQUMsTUFBTSxDQUFDO1FBQzNCO1lBQ0UsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztBQUNILENBQUMifQ==