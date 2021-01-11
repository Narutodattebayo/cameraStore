
import { Model } from "mongoose";

import BaseEntity from "../base.entity";
import cartModel from "./../../models/cart.model";

class CartEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }

    
     
    async addToCart(payload: any) {
        let cartData = await new this.model(payload).save();
        return cartData.toObject();
    }






}

export const CartV1 = new CartEntity(cartModel);