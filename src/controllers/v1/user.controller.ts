
import { Request, Response, NextFunction } from "express";
import { userV1 } from "../../entity/v1/user.v1.entity";
import { UserSessionV1 } from "../../entity/v1/usersession.v1.entity"
import { ProductV1 } from "../../entity/v1/product.v1.entity"
import BaseClass from "../base.controller";
import { ApiPath, ApiOperationPost, ApiOperationGet } from "swagger-express-ts";
import { SUCCESS, RESPONSE, } from "../../common";
import { Auth } from "../../services/auth";
import { productList, myCart } from "../../builders/user.builders"
import { CartV1 } from "../../entity/v1/cart.v1.entity"


@ApiPath({
    path: "/api/v1/user",
    name: "User Onboarding Module",
    security: { apiKeyHeader: [] },
})
class UserClass extends BaseClass {

    constructor() {
        super();
    }




    @ApiOperationPost({
        description: "User SignUp",
        path: '/signup',
        parameters: {

            body: {
                description: 'Body for signup',
                required: true,
                model: 'ReqAddUser'
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    })
    async userSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.body;
            payload.email = payload.email.toLowerCase();
            let existingUser = await userV1.findOne({ email: payload.email })
            if (!existingUser) {
                userV1.newUser(payload);
                return this.sendResponse(res, SUCCESS.DEFAULT)
            } else return this.sendResponse(res, RESPONSE.USER(res.locals.lang).EMAIL_EXISTS)

        } catch (err) {
            next(err);
        }
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
    async userLogin(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.body,
                checkUserExists: any = await userV1.findOne({ email: payload.email });

            if (checkUserExists) {
                if (await userV1.verifyPassword(checkUserExists, payload.password)) {
                    payload.userId = checkUserExists._id;
                    let sessionData = await UserSessionV1.createUserSession({ userId: checkUserExists._id, isActive: true })
                    return this.sendResponse(res, SUCCESS.DEFAULT, {
                        adminData: checkUserExists,
                        authToken: Auth.generateAdminJWT(sessionData._id)
                    });
                } else this.sendResponse(res, RESPONSE.ADMIN(res.locals.lang).INCORRECT_PASSWORD);
            } else this.sendResponse(res, RESPONSE.ADMIN(res.locals.lang).EMAIL_NOT_EXISTS);
        } catch (err) {
            next(err);
        }
    }


    @ApiOperationGet({
        description: "product list",
        path: '/products',
        parameters: {

            query: {
                page: {
                    description: "page",
                    required: true
                },
                limit: {
                    description: "limit",
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
    async productsList(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.query;
            let pipeline = productList(payload);
            let list = await ProductV1.basicAggregate(pipeline);
            return this.sendResponse(res, SUCCESS.DEFAULT, list)
        } catch (err) {
            next(err);
        }
    }




    @ApiOperationPost({
        description: "add to cart ",
        path: '/addToCart',
        parameters: {

            body: {
                description: "add to cart",
                required: true,
                model: "addToCartModel"
            }
        },
        responses: {
            200: {
                description: "Success",
                type: "String",
            }
        },
    })
    async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.body;
            let product: any = await ProductV1.findOne({ _id: payload.productId })
            if (product) {
                let isAlreadyInCart: any = await CartV1.findOne({ productId: product._id, userId: res.locals.userId })
                if (isAlreadyInCart) {
                    CartV1.editEntity({ _id: isAlreadyInCart._id }, { $inc: { count: payload.count } })
                    return this.sendResponse(res, SUCCESS.DEFAULT)
                } else {
                    CartV1.addToCart({ productId: product._id, userId: res.locals.userId, count: payload.count })
                    return this.sendResponse(res, SUCCESS.DEFAULT)
                }
            } else this.sendResponse(res, RESPONSE.ADMIN(res.locals.lang).PRODUCT_NOT_FOUND);


        } catch (err) {
            next(err);
        }
    }



    @ApiOperationGet({
        description: "myCart list",
        path: '/myCart',
        parameters: {

            query: {
                page: {
                    description: "page",
                    required: true
                },
                limit: {
                    description: "limit",
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
    async myCart(req: Request, res: Response, next: NextFunction) {
        try {
            let payload = req.query;
            let pipeline = myCart(payload, res.locals.userId);
            let list = await CartV1.basicAggregate(pipeline);
            return this.sendResponse(res, SUCCESS.DEFAULT, list)
        } catch (err) {
            next(err);
        }
    }
}

export const UserController = new UserClass();