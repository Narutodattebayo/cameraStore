

import { Schema, model, SchemaTypes } from "mongoose";



const productSchema = new Schema(
    {

        "name": { type: SchemaTypes.String, trim: true },
        "description": { type: SchemaTypes.String },
        "price": { type: SchemaTypes.Number },
        "make": { type: SchemaTypes.Number },
        "isDelete": { type: SchemaTypes.Boolean, default: false }
    },
    {
        versionKey: false,
        collection: "product",
        timestamps: true
    }
);

export default model("product", productSchema);