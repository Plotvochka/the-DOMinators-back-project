import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import * as userServices from '../services/user.js';

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

export const updateUserDaylyNorm = async (req, res, next) => {
  const { userId } = req.params;
  const { daylyNorm } = req.body;

  console.log(`Received update for userId: ${userId}, daylyNorm: ${daylyNorm}`); //пе

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw createHttpError(404, 'User not found');
  }

  if (daylyNorm > 15000 || daylyNorm < 0) {
    throw createHttpError(400, 'Daily norm must be between 0 and 15000ml.');
  }

  try {
    const updatedUser = await userServices.updateUserDaylyNorm(
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
