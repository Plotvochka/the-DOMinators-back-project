import UserInfoCollection from '../db/models/UserInfo.js';

export const getUserInfo = ({ userId }) =>
  UserInfoCollection.findOne({ userId });

export const updateUserDaylyNorm = async (userId, daylyNorm) => {
  return UserInfoCollection.findByIdAndUpdate(
    userId,
    { daylyNorm },
    { new: true, runValidators: true },
  );
};
