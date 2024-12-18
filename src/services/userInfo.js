import UserInfoCollection from '../db/models/UserInfo.js';

export const avatarUserServices = (userId, avatarUrl) => {
  return UserInfoCollection.findByIdAndUpdate(
    userId,
    { avatarUrl },
    { new: true, runValidators: true },
  );
};

export const getUserInfo = (userId) => UserInfoCollection.findById(userId);

export const updateUserInfo = async (userId, payload, options = {}) => {
  const rawResult = await UserInfoCollection.findOneAndUpdate(
    { _id: userId },
    payload,
    {
      ...options,
      includeResultMetadata: true,
      new: true,
      runValidators: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    user: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const updateUserDaylyNorm = async (userId, daylyNorm) => {
  return UserInfoCollection.findByIdAndUpdate(
    userId,
    { daylyNorm },
    { new: true, runValidators: true },
  );
};
