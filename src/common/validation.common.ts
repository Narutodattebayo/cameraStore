

import { Joi } from "celebrate";

export const VALIDATION = {

    USER: {
        NAME: Joi.string().min(3).max(40),
        EMAIL: Joi.string().trim().email().max(40),
        PASSWORD: Joi.string().min(8).max(15),
        COUNTRY_CODE: Joi.string().allow("", null),
        PHONE: Joi.string().min(8).max(15).allow("", null),

    },
    ADMIN: {
        NAME: Joi.string().min(3).max(40),
        EMAIL: Joi.string().trim().email().max(40),
        PASSWORD: Joi.string().min(8).max(15),
    },
    PRODUCT: {
        NAME: Joi.string().min(3).max(40),
        DESCRIPTION: Joi.string().min(3).max(40),
        PRICE: Joi.number().min(1),
        MAKE:Joi.number()
    },
    GENERAL:{
        PAGE:Joi.number().min(1),
        LIMIT:Joi.number().min(1),
        ID:Joi.string().regex(/^[a-f\d]{24}$/i),
        COUNT:Joi.number().min(1)
    }

}