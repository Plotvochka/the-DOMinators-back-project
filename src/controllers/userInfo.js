import mongoose from "mongoose";
import createHttpError from "http-errors";
import * as userInfoServices from "../services/userInfo.js";

export const getUserInfoController = async (req, res, next) => {
    const { userId } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw createHttpError(404, 'User not found');
      }

      const data = await userInfoServices.getUserInfo(userId);
      

      if (!data) {
        next(createHttpError(404, 'User not found'));
        return;
      }
    

    res.json({
        status: 200,
        message: `Successfully found user info with id ${userId}!`,
        data,
    });
};

export const patchUserInfoController = async(req, res, next) => {
  const { userId } = req.params;

  const result = await userInfoServices.updateUserInfo(userId, req.body);
  

  if (!result) {
    return next(createHttpError(404, "User not found"));
  };
  

  res.json({
    status: 200,
    message: "Successfully upserted a user info!",
    data: result.user,
  });
};