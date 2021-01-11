
import { Model } from "mongoose";

import { Auth } from "../../services/auth";
import BaseEntity from "../base.entity";
import userModel from "./../../models/user.model";
import { CONFIG } from "../../common";

class UserEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }



    async newUser(payload: any) {
        payload.password = Auth.hashData(payload.password, CONFIG.JWT_PASSWORD)
        let userData = await new this.model(payload).save();
        return userData.toObject();
    }


    async verifyPassword(adminData: any, password: string): Promise<boolean> {
        return adminData.password === Auth.hashData(password, CONFIG.JWT_PASSWORD);
    }





}

export const userV1 = new UserEntity(userModel);