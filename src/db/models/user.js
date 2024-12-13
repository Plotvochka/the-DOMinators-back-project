import { model, Schema } from "mongoose";

const usersSchema = new Schema({
email:{ type: String, required: true, unique: true},
password:{ type: String, required: true},

}, 
{ timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function(){
const obj = this.toObject();
delete obj.password;
return obj;
};

export const UsersCollection = model('user', usersSchema);