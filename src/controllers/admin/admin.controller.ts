
import { Request, Response, NextFunction } from "express";
import { ApiPath, ApiOperationPost, ApiOperationGet } from "swagger-express-ts";
import { AdminV1 } from "../../entity/v1/admin.v1.entity";
import { AdminSessionV1 } from "../../entity/v1/adminsession.v1.entity"
import { ProductV1 } from "../../entity/v1/product.v1.entity"
import { CartV1 } from "../../entity/v1/cart.v1.entity"
import BaseClass from "../base.controller";
import { SUCCESS, RESPONSE } from "../../common";
import { Auth } from "../../services/auth";
import { userCart } from "../../builders/user.builders"

@ApiPath({
    path: "/api/admin",
    name: "Admin Onboarding Module",
    security: { apiKeyHeader: [] },
})
class AdminCommonClass extends BaseClass {

    constructor() {
        super();
    }



    @ApiOperationPost({
        description: "login",
        path: '/login',
        parameters: {

            body: {
                description: 'Body for login',
                required: true,
                model: 'ReqAdminLogin'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    })
    async adminLogin(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.body,
                checkAdminExists: any = await AdminV1.findOne({ email: payload.email });

            if (checkAdminExists) {
                if (await AdminV1.verifyPassword(checkAdminExists, payload.password)) {
                    payload.adminId = checkAdminExists._id;
                    let sessionData = await AdminSessionV1.createAdminSession({ adminId: checkAdminExists._id, isActive: true })
                    return this.sendResponse(res, SUCCESS.DEFAULT, {
                        adminData: checkAdminExists,
                        authToken: Auth.generateAdminJWT(sessionData._id)
                    });
                } else this.sendResponse(res, RESPONSE.ADMIN(res.locals.lang).INCORRECT_PASSWORD);
            } else this.sendResponse(res, RESPONSE.ADMIN(res.locals.lang).EMAIL_NOT_EXISTS);
        } catch (err) {
            next(err);
        }
    }


    @ApiOperationPost({
        description: "product",
        path: '/product',
        parameters: {

            body: {
                description: 'Body for add product',
                required: true,
                model: 'ReqAdminAddProduct'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    })
    async addProduct(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.body;
            ProductV1.createProduct(payload);
            return this.sendResponse(res, SUCCESS.DEFAULT)
        } catch (err) {
            next(err);
        }
    }



    @ApiOperationGet({
        description: "myCart list",
        path: '/userCart',
        parameters: {

            query: {
                page: {
                    description: "page",
                    required: true
                },
                limit: {
                    description: "limit",
                    required: true
                },
                userId: {
                    description: "userId",
                    required: true
                }
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    })
    async getUserCart(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.query;
            let pipeline = userCart(payload);
            let list = await CartV1.basicAggregate(pipeline);
            return this.sendResponse(res, SUCCESS.DEFAULT, list)
        } catch (err) {
            next(err);
        }
    }


}

export const AdminCommonController = new AdminCommonClass();