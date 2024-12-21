import { Schema, model } from 'mongoose';

const userInfoSchema = new Schema(
  {
    email: String,
    password: {
      type: String,
      minLength: 8,
      maxLength: 64,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'female',
    },
    name: {
      type: String,
      maxLength: 32,
    },
    daylyNorm: {
      type: Number,
      required: true,
      default: 2000,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);
userInfoSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserInfoCollection = model('users', userInfoSchema);

export default UserInfoCollection;
