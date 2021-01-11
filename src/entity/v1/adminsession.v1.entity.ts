
import { Model } from "mongoose";

import BaseEntity from "../base.entity";
import AdminSessionModel from "./../../models/admin.sessionmodel";

class AdminSessionEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }

    /**
     * creates a new admin
     * @param payload - admin data to insert
     */
    async createAdminSession(payload: any) {
        let adminSessionData = await new this.model(payload).save();
        return adminSessionData.toObject();
    }






}

export const AdminSessionV1 = new AdminSessionEntity(AdminSessionModel);