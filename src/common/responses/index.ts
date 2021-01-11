/**
 * @file common/responses
 * @description exposes all the responses objects
 * @created 
 * @author 
*/

import USER from "./user.responses";
import ADMIN from "./admin.responses"


export const SUCCESS = {
    DEFAULT: {
        httpCode: 200,
        statusCode: 200,
        message: 'Success'
    }

}

export const CUSTOM_ERROR = (data?: any, message?: string) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    })

}


export const RESPONSE={
    USER,
    ADMIN
}







