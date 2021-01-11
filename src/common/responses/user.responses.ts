

import HTTP from "./code.responses";

export const MSG: any = {
    EN: {
        EMAIL_EXISTS:"This email already exists"
        
    },
  
}

export default (lang: string, data?: any) => ({
    EMAIL_EXISTS: { httpCode: HTTP.BAD_REQUEST, statusCode: 400, message: MSG[lang].EMAIL_EXISTS },
});





export const CUSTOM_SUCCESS = (data?: any, message?: string) => {
    return ({
        httpCode: 200,
        statusCode: 200,
        message: message ? message : "Success",
        data: data ? data : {}
    })

}

export const CUSTOM_ERROR = (data?: any, message?: string) => {
    return ({
        httpCode: 400,
        statusCode: 400,
        message: message ? message : "Success",
        data: data ? data : {}
    })

}









