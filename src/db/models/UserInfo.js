import { Schema, model } from "mongoose";

const userInfoSchema = new Schema({
    email: { 
        type: String,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 64,
    },
    oldPassword: {
        type: String,
        minLength: 8,
        maxLength: 64,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        default: 'male',
    },
    name: {
        type: String,
        maxLength: 32,
    }

}, { timestamps: true,  versionKey: false, });

const UserInfoCollection = model("users", userInfoSchema);

export default UserInfoCollection;