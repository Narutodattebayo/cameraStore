
import { Model } from "mongoose";

import BaseEntity from "../base.entity";
import productModel from "./../../models/product.model";

class ProductEntity extends BaseEntity {

    constructor(model: Model<any>) {
        super(model);
    }

    
     
    async createProduct(payload: any) {
        let productData = await new this.model(payload).save();
        return productData.toObject();
    }






}

export const ProductV1 = new ProductEntity(productModel);