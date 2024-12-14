import UserInfoCollection from "../db/models/UserInfo.js";

export const getUserInfo = ({ userId }) => UserInfoCollection.findOne({ userId });