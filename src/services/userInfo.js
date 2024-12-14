import UserInfoCollection from "../db/models/UserInfo.js";

export const getUserInfo = ({ userId }) => UserInfoCollection.findOne({ userId });

export const updateUserInfo = async (userId, payload, options = {}) => {
    const rawResult = await UserInfoCollection.findOneAndUpdate(
        {_id: userId},
        payload,
        {
            ...options,
            includeResultMetadata: true,
            new: true,
            runValidators: true,
        }
    );
    

    if (!rawResult || !rawResult.value) return null;

    return {
        user: rawResult.value,
        isNew: Boolean(rawResult.lastErrorObject.upserted),
    };
};