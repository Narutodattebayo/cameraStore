
import HTTP from "./code.responses";

const MSG: any = {
    EN: {
        NOT_FOUND: 'Admin not found',
        EMAIL_NOT_EXISTS: `Couldn't find your account`,
        INCORRECT_PASSWORD: ' Password is incorrect',
        PRODUCT_NOT_FOUND:"Product not found"
       
    }
}

export default (lang: string) => ({
    NOT_FOUND: { httpCode: HTTP.NOT_FOUND, statusCode: 1001, message: MSG[lang].NOT_FOUND },
    EMAIL_NOT_EXISTS: { httpCode: HTTP.NOT_FOUND, statusCode: 404, message: MSG[lang].EMAIL_NOT_EXISTS },
    INCORRECT_PASSWORD: { httpCode: HTTP.BAD_REQUEST, statusCode: 400, message: MSG[lang].INCORRECT_PASSWORD },
    PRODUCT_NOT_FOUND: { httpCode: HTTP.BAD_REQUEST, statusCode: 400, message: MSG[lang].PRODUCT_NOT_FOUND },
   
});