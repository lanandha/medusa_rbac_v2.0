"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const rbac_1 = require("./../../../../modules/rbac");
const utils_1 = require("@medusajs/framework/utils");
const types_1 = require("./../../../..//modules/rbac/types");
const POST = async (req, res) => {
    const rawRequest = req;
    const query = req.scope.resolve(utils_1.ContainerRegistrationKeys.QUERY);
    const { data: rolesWithUsers, } = await query.graph({
        entity: "rbac_role",
        fields: [
            "*",
            "users.*",
        ],
    });
    if (rawRequest.session && rawRequest.session.auth_context && rawRequest.session.auth_context.actor_id) {
        const existingRole = rolesWithUsers.find(ru => ru.users.find(u => u.id === rawRequest.session.auth_context.actor_id));
        if (existingRole) {
            const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
            const authorizationResponse = {
                ...await rbacModuleService.testAuthorization(existingRole, types_1.PermissionMatcherType.API, rawRequest.body.urlToTest),
                actorId: rawRequest.session.auth_context.actor_id
            };
            return res.json(authorizationResponse);
        }
        else {
            return res.json({
                actorId: rawRequest.session.auth_context.actor_id,
                url: rawRequest.body.urlToTest,
                allowed: [],
                denied: []
            });
        }
    }
    else {
        return res.json({
            actorId: undefined,
            url: rawRequest.body.urlToTest,
            allowed: [],
            denied: []
        });
    }
};
exports.POST = POST;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL3JiYWMvY2hlY2svcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEscURBQXdEO0FBRXhELHFEQUFxRTtBQUNyRSw2REFBaUc7QUFNMUYsTUFBTSxJQUFJLEdBQUcsS0FBSyxFQUN2QixHQUFrQixFQUNsQixHQUFtQixFQUNuQixFQUFFO0lBQ0YsTUFBTSxVQUFVLEdBQUcsR0FBcUIsQ0FBQztJQUV6QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQ0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVoRSxNQUFNLEVBQ0osSUFBSSxFQUFFLGNBQWMsR0FDckIsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7UUFDbkIsTUFBTSxFQUFFO1lBQ04sR0FBRztZQUNILFNBQVM7U0FDVjtLQUNGLENBQUMsQ0FBQztJQUVILElBQUksVUFBVSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwRyxNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdEgsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQixNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUQsa0JBQVcsQ0FDWixDQUFBO1lBQ0QsTUFBTSxxQkFBcUIsR0FBMEI7Z0JBQ25ELEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FDNUMsWUFBWSxFQUNaLDZCQUFxQixDQUFDLEdBQUcsRUFDeEIsVUFBVSxDQUFDLElBQTBCLENBQUMsU0FBUyxDQUMvQztnQkFDRCxPQUFPLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUTthQUNsRCxDQUFBO1lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7UUFDeEMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsT0FBTyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVE7Z0JBQ2pELEdBQUcsRUFBRyxVQUFVLENBQUMsSUFBMEIsQ0FBQyxTQUFTO2dCQUNyRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxNQUFNLEVBQUUsRUFBRTthQUNYLENBQUMsQ0FBQTtRQUNKLENBQUM7SUFDTCxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztZQUNkLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEdBQUcsRUFBRyxVQUFVLENBQUMsSUFBMEIsQ0FBQyxTQUFTO1lBQ3JELE9BQU8sRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLEVBQUU7U0FDWCxDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBakRZLFFBQUEsSUFBSSxRQWlEaEIifQ==