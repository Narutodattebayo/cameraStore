
import { Schema, model, SchemaTypes } from "mongoose";

const adminSessionSchema = new Schema(
    {
        adminId: { type: SchemaTypes.ObjectId, required: true, index: true },
        isActive: { type: SchemaTypes.Boolean, default: true },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: "adminSession"
    }
);

export default model("adminSession", adminSessionSchema);