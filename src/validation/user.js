import Joi from "joi";

export const updateUserInfoSchema = Joi.object({
    name: Joi.string().max(32),
    password: Joi.string().min(3).max(20),
    oldPassword: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    gender: Joi.string().valid('male', 'female'),
});

export const avatarUserSchema = Joi.object({
    avatarUrl: Joi.string(),
});