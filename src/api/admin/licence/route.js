"use strict";
/*
 * Copyright 2024 RSC-Labs, https://rsoftcon.com/. All rights reserved.
 *
 * Commercial License
 *
 * It is commercial software. To use it, you must obtain a
 * license and agree to the [License Terms]
 * (https://rsoftcon.com/labs/medusa/licence).
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const utils_1 = require("@medusajs/utils");
const rbac_1 = require("../../../modules/rbac");
const GET = async (req, res) => {
    const rbacModuleService = req.scope.resolve(rbac_1.RBAC_MODULE);
    try {
        const result = await rbacModuleService.checkLicence();
        res.status(200).json({
            licence: result
        });
    }
    catch (error) {
        throw new utils_1.MedusaError(utils_1.MedusaErrorTypes.DB_ERROR, error.message);
    }
};
exports.GET = GET;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL2xpY2VuY2Uvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7R0FTRzs7O0FBTUgsMkNBQStEO0FBRS9ELGdEQUFvRDtBQUU3QyxNQUFNLEdBQUcsR0FBRyxLQUFLLEVBQ3RCLEdBQWtCLEVBQ2xCLEdBQW1CLEVBQ25CLEVBQUU7SUFFRixNQUFNLGlCQUFpQixHQUFzQixHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FDNUQsa0JBQVcsQ0FDWixDQUFDO0lBRUYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQixPQUFPLEVBQUUsTUFBTTtTQUNoQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE1BQU0sSUFBSSxtQkFBVyxDQUNuQix3QkFBZ0IsQ0FBQyxRQUFRLEVBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQ2QsQ0FBQTtJQUNILENBQUM7QUFDSCxDQUFDLENBQUE7QUFwQlksUUFBQSxHQUFHLE9Bb0JmIn0=