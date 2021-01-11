

import cors from "cors";
import helmet from "helmet";
import express from "express";
import bodyParser from "body-parser";

import routes from "./routes";
 import Middleware from "./middlewares";
 import { mongoDOA } from "./services/mongodbConnection";
 import { bootstrapStatus } from "./services/bootstraps"
 import {CONFIG} from "./common/config.common"
import * as swagger from "swagger-express-ts";
import "reflect-metadata";
import { SwaggerDefinitionConstant } from "swagger-express-ts";
 import * as swaggermodel from "./swaggermodels/"
 export { swaggermodel };

class Application {

    private app: express.Application;

    constructor() {
        this.app = express(); // initialize the express instance
        this.init();
    }

    /** gets the app instance */
    get instance(): express.Application {
        return this.app;
    }

    /** initializes app components */
    async init() {
        mongoDOA.connectDatabase(CONFIG.DB_URI);
        bootstrapStatus.createAdmin;
         this.useMiddlewares(); // use middlewares for requests
         this.useRoutes(); // use routing
       
    }

    /** uses the middlewares for the app */
    useMiddlewares() {
        this.app.use(cors()); // handles cross origin resouce sharing
        this.app.use(bodyParser.json()); // parses the incoming json requests
        this.app.use(bodyParser.urlencoded({ extended: false })); // parses the incoming query requests
        this.app.use(helmet()); // makes apps more secure
       
        this.app.use('/api-docs/swagger', express.static('swagger'));
        this.app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));

        this.app.use(express.static(process.cwd() + "/asset"));

        this.app.use(swagger.express(
            {
                definition: {
                    info: {
                        title: "Shop",
                        version: "1.0",
                    },
                    securityDefinitions: {
                        apiKeyHeader: {
                            type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                            in: SwaggerDefinitionConstant.Security.In.HEADER,
                            name: "Authorization"
                        }
                    },
                    schemes: ['http', 'https']
                }
            }
        ));
    }

    /** uses the routes for the app */
    useRoutes() {
         this.app.use(routes.path, routes.instance); // uses the in-app routing
         this.app.use(Middleware.InvalidRoute); // invalid route handler
         this.app.use(Middleware.ErrorHandler); // global error handler
    }
}

export default new Application();