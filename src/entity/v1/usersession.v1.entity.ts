
import { Model } from "mongoose";

import BaseEntity from "../base.entity";
import UserSessionModel from "./../../models/user.session.model";

class UserSessionEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }

    /**
     * creates a new admin
     * @param payload - admin data to insert
     */
    async createUserSession(payload: any) {
        let adminSessionData = await new this.model(payload).save();
        return adminSessionData.toObject();
    }






}

export const UserSessionV1 = new UserSessionEntity(UserSessionModel);