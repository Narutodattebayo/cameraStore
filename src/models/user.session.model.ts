
import { Schema, model, SchemaTypes } from "mongoose";

const userSessionSchema = new Schema(
    {
        userId: { type: SchemaTypes.ObjectId, required: true, index: true },
        isActive: { type: SchemaTypes.Boolean, default: true },
    },
    {
        versionKey: false,
        timestamps: true,
        collection: "userSession"
    }
);

export default model("userSession", userSessionSchema);