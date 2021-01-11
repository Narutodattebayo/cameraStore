

import { Schema, model, SchemaTypes } from "mongoose";




// defines the single user schema 
const userSchema = new Schema(
    {
        name: { type: SchemaTypes.String,required:true },
        email: { type: SchemaTypes.String ,required:true},
        password: { type: SchemaTypes.String,required:true }
    },
    {
        versionKey: false,
        collection: "users",
        timestamps: true
    }
);


export default model("users", userSchema);