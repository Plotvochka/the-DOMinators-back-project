import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import * as userServices from '../services/user.js';
import { updateDaylyNorm } from '../services/user.js';

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

//my code
export const updateUserDaylyNorm = async (req, res) => {
  try {
    const { userId, daylyNorm } = req.body;

    if (!userId || daylyNorm === undefined) {
      return res.json({
        status: 400,
        message: 'User ID and daily water intake are required.',
      });
    }

    const updatedUser = await updateDaylyNorm(userId, daylyNorm);
    res.json({
      status: 200,
      message: 'Daily water intake updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating daily water intake:', error);
    res.status(400).json({ message: error.message });
  }
};
