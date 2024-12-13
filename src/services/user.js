import UserInfoCollection from '../db/models/UserInfo.js';

export const getUserInfo = ({ userId }) =>
  UserInfoCollection.findOne({ userId });

//my code

export const updateDaylyNorm = async (userId, daylyNorm) => {
  if (daylyNorm > 15000) {
    throw new Error('Daily water intake cannot exceed 15000ml.');
  }

  const updatedUser = await UserInfoCollection.findByIdAndUpdate(
    userId,
    { daylyNorm },
    { new: true },
  );

  if (!updatedUser) {
    throw new Error('User not found.');
  }

  return updatedUser;
};
