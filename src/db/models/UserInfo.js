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
      default: "https://res.cloudinary.com/dbs7urwoj/image/upload/v1734265734/photos/b6upxgpbaacbcw5jw0fb.svg"
    },
  },
  { timestamps: true, versionKey: false },
);

const UserInfoCollection = model('users', userInfoSchema);

export default UserInfoCollection;
