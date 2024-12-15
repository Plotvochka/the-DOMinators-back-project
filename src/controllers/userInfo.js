import mongoose from 'mongoose';
import * as path from 'node:path';
import createHttpError from 'http-errors';

import * as userInfoServices from '../services/userInfo.js';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
const enableCloudinary = env('ENABLE_CLOUDINARY');

export const patchAvatarUser = async (req, res, next) => {
  const { userId } = req.params;

  let avatarUrl = null;

  if (req.file) {
    if (enableCloudinary === 'true') {
      avatarUrl = await saveFileCloudinary(req.file, 'photos');
    } else {
      await saveFileToUploadDir(req.file);

      avatarUrl = path.join(req.file.filename);
    }
  }

  const result = await userInfoServices.avatarUserServices(userId, avatarUrl);

  res.json({
    status: 200,
    message: 'Successfully upserted a user avatar!',
    data: result,
  });
};

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

export const patchUserInfoController = async (req, res, next) => {
  const { userId } = req.params;

  const result = await userInfoServices.updateUserInfo(userId, req.body);

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully upserted a user info!',
    data: result.user,
  });
};

export const updateUserDaylyNorm = async (req, res, next) => {
  const { userId } = req.params;
  const { daylyNorm } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createHttpError(404, 'User not found');
  }

  if (daylyNorm > 15000 || daylyNorm < 0) {
    throw createHttpError(400, 'Daily norm must be between 0 and 15000ml.');
  }

  try {
    const updatedUser = await userInfoServices.updateUserDaylyNorm(
      userId,
      daylyNorm,
    );

    if (!updatedUser) {
      next(createHttpError(404, 'User not found'));
      return;
    }

    res.json({
      status: 200,
      message: `Successfully updated daily norm for user with id ${userId}!`,
      data: updatedUser,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
