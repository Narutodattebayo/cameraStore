import { Auth } from "../services/auth";
import {userV1} from "../entity/v1/user.v1.entity"
import {UserSessionV1} from "../entity/v1/usersession.v1.entity"

export const userMiddleware=async (req:any, res:any, next:any) => {
    try {
        if (req.headers && req.headers.authorization) {
            let data = req.headers.authorization.split(" ")
            console.log(data)
            if (data[0] == "Bearer" && data[1].length) {
                let decrypted:any = await Auth.verifyToken(data[1])
                console.log(decrypted)
                if (decrypted.success) {
                    let userSession:any = await UserSessionV1.findOne({_id:decrypted.data.sessionId})
                    if (userSession) {
                        let userDetails:any=await userV1.findOne({_id:userSession.userId})
                        res.locals.userData = userDetails
                        res.locals.userData.sessionId = decrypted.data.sessionId,
                        res.locals.userId=userDetails._id
                        console.log("going to route now.........")
                        next()
                    } else res.send({ http: 400, status: 400, message: "Session Expired" })

                }

            } else res.send({ http: 400, status: 400, message: "You are not authorised to perform this action" })
        } else {
            res.send({ http: 400, status: 400, message: "You are not authorised to perform this action" })
        }
    } catch (err) {
        res.send({ http: 400, status: 400, message: "Invalid access Token" })
    }

}