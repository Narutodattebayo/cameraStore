

import dotenv from "dotenv";

// system error message codes for debugging
export const SYS_ERR = {
    NODE_ENV_INVALID: 100,
    BOOTSTRAP_ERROR: 101,
    MONGO_CONN_FAILED: 103
}

// check if NODE_ENV exists, else throw an error
if (typeof process.env.NODE_ENV === 'undefined') process.exit(SYS_ERR.NODE_ENV_INVALID);

// configure the environment
dotenv.config({ path: `bin/.env.${process.env.NODE_ENV}` });

// configurations and credentails goes in here
export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: <string>process.env.DB_URI,
    DB_POOLSIZE: 50,
    JWT_PASSWORD: 'qwerty',
    APP_PORT:process.env.PORT
    
   


}

export const BASE = {
    
}