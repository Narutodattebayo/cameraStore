

import { Router } from "express";

import BaseRoute from "../base.routes";
import AdminRoutes from "./admin.routes";


class v1AppRoutes extends BaseRoute {

    public path = '/admin';

    constructor() {
        super();
        this.init();
    }

    get instance(): Router {
        return this.router;
    }

    /* defines middlewares for all the routes passing through */
    private routeMiddlewares() {
        this.router.use('/', (req, res, next) => {

            // prints the route endpoint on the console
            console.log(`\n========================= NEW REQUEST -> ${req.method} ${req.originalUrl}`);
            console.log(req.body);
            console.log(`\n=========================`);

            // sets the language for routes
            res.locals.lang = req.headers.lang || 'EN';
            console.log(req.headers)
            next();
        });
    }

    /** initializes routes */
    private init() {
        this.routeMiddlewares();

        // routes go here

        this.router.use(AdminRoutes.path, AdminRoutes.instance);


    }
}

export default new v1AppRoutes();