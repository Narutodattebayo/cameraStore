

import { Schema, model, SchemaTypes } from "mongoose";



const cartSchema = new Schema(
    {
        productId: { type: SchemaTypes.ObjectId, },
        userId: { type: SchemaTypes.ObjectId },
        count: { type: SchemaTypes.Number, default: 1 },
        isDelete: { type: SchemaTypes.Boolean, default: false }
    },
    {
        versionKey: false,
        collection: "cart",
        timestamps: true
    }
);

export default model("cart", cartSchema);