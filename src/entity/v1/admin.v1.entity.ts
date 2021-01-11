
import { Model } from "mongoose";

import { Auth } from "../../services/auth";
import BaseEntity from "../base.entity";
import AdminModel from "./../../models/admin.model";
import { CONFIG } from "../../common";

class AdminEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }

    /**
     * creates a new admin
     * @param payload - admin data to insert
     */
    async createAdmin(payload: any) {
        payload.password = Auth.hashData('Admin@123', CONFIG.JWT_PASSWORD);
        let adminData = await new this.model(payload).save();
        return adminData.toObject();
    }

    /**
     * returns hashed password using the salt
     * @param adminData - the admin data
     * @param password - the password to match
     */
    async verifyPassword(adminData: any, password: string): Promise<boolean> {
        return adminData.password === Auth.hashData(password, CONFIG.JWT_PASSWORD);
    }






}

export const AdminV1 = new AdminEntity(AdminModel);