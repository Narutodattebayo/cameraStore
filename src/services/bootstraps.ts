


if (!process.env.NODE_ENV) { console.error("ERROR: No Node Environment defined"); process.exit(100); }

import { mongoDOA } from "./mongodbConnection";
import * as Seeder from "./seeder.bootstrap";

mongoDOA.connectDatabase(process.env.DB_URI as string);

export const bootstrapStatus = {


    createAdmin: Seeder.createAdmin([
        { name: 'Admin', email: "owner@yopmail.com" },
    ]),

};

