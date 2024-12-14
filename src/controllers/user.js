import mongoose from "mongoose";
import createHttpError from "http-errors";
import * as userServices from "../services/user.js";

export const getUserInfoController = async (req, res, next) => {
    const { userId } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw createHttpError(404, 'User not found');
      }

      const data = await userServices.getUserInfo(userId);
      

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

export const patchUserInfoController = async(req, res) => {};