

import { Router } from "express";

import userRoutes from "./users";

import BaseRoute from "./base.routes";

import AdminRoutes from "./admin/index"



class Routes extends BaseRoute {

    public path = '/api';

    constructor() {
        super();
        this.init();
    }

    get instance(): Router {
        return this.router;
    }

    /** initializes routes */
    private init() {
        this.router.use(userRoutes.path, userRoutes.instance);
        this.router.use(AdminRoutes.path,AdminRoutes.instance)
        
    }
}

export default new Routes();