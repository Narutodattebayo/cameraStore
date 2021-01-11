/**
 * @file user.v1.routes
 * @description 
 * @author 
*/

import { celebrate } from "celebrate";
import { Router, Request, Response, NextFunction } from "express";

import BaseRoute from "../base.routes";
import { VALIDATION } from "../../common";
import { UserController } from "../../controllers/v1/user.controller"
import { userMiddleware } from "../../middlewares/user.middlewares"

class V1UserRouteClass extends BaseRoute {

    public path: string;

    constructor(path: string) {
        super();
        this.path = path;
        this.initRoutes();
    }

    get instance(): Router {
        return this.router;
    }

    initRoutes() {


        this.router.post('/signup',
            celebrate({
                body: {
                    name: VALIDATION.USER.NAME.required(),
                    email: VALIDATION.USER.EMAIL.required(),
                    password: VALIDATION.USER.PASSWORD.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                UserController.userSignUp(req, res, next)
            }
        );

        this.router.post('/login',
            celebrate({
                body: {
                    email: VALIDATION.USER.EMAIL.required(),
                    password: VALIDATION.USER.PASSWORD.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                UserController.userLogin(req, res, next)
            }
        );

        this.router.get('/products',
            userMiddleware,
            celebrate({
                query: {
                    page: VALIDATION.GENERAL.PAGE.required(),
                    limit: VALIDATION.GENERAL.LIMIT.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                UserController.productsList(req, res, next)
            }
        );

        this.router.post('/addToCart',
            userMiddleware,
            celebrate({
                body: {
                    productId: VALIDATION.GENERAL.ID.required(),
                    count: VALIDATION.GENERAL.COUNT.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                UserController.addToCart(req, res, next)
            }
        );

        this.router.get('/myCart',
            userMiddleware,
            celebrate({
                query: {
                    page: VALIDATION.GENERAL.PAGE.required(),
                    limit: VALIDATION.GENERAL.LIMIT.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                UserController.myCart(req, res, next)
            }
        );




    }
}

export default new V1UserRouteClass('/');