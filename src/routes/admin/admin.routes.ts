

import { celebrate } from "celebrate";
import { Request, Response, NextFunction, Router } from "express";

import BaseRoute from "../base.routes";
import { VALIDATION } from "../../common";
import { AdminCommonController } from "../../controllers/admin/admin.controller";

class CommonRouteClass extends BaseRoute {

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

        /** admin login */
        this.router.post('/login',
            celebrate({
                body: {
                    email: VALIDATION.ADMIN.EMAIL.required(),
                    password: VALIDATION.ADMIN.PASSWORD.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                AdminCommonController.adminLogin(req, res, next);
            }
        );

        this.router.post('/product',
            celebrate({
                body: {
                    name: VALIDATION.PRODUCT.NAME.required(),
                    description: VALIDATION.PRODUCT.DESCRIPTION.required(),
                    price: VALIDATION.PRODUCT.PRICE.required(),
                    make: VALIDATION.PRODUCT.MAKE.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                AdminCommonController.addProduct(req, res, next);
            }
        );


        this.router.get('/userCart',
            celebrate({
                query: {
                    userId: VALIDATION.GENERAL.ID.required(),
                    page: VALIDATION.GENERAL.PAGE.required(),
                    limit: VALIDATION.GENERAL.LIMIT.required()
                }
            }),
            (req: Request, res: Response, next: NextFunction) => {
                AdminCommonController.getUserCart(req, res, next)
            }
        );




    }
}

export default new CommonRouteClass('/');