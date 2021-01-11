

import { Schema, model, SchemaTypes } from "mongoose";



const adminSchema = new Schema(
    {
        "email": { type: SchemaTypes.String, required: true, index: true },
        "isDelete": { type: SchemaTypes.Boolean, default: false },
        "name": { type: SchemaTypes.String, trim: true },
        "password": { type: SchemaTypes.String },
    },
    {
        versionKey: false,
        collection: "admin",
        timestamps: true
    }
);

export default model("admin", adminSchema);