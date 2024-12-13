import { Schema, model } from 'mongoose';

const userInfoSchema = new Schema(
  {
    email: String,
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
      min: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

const UserInfoCollection = model('users', userInfoSchema);

export default UserInfoCollection;
