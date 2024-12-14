import Joi from "joi";

export const updateUserInfoSchema = Joi.object({
    name: Joi.string().max(32),
    email: Joi.string().email(),
    password: Joi.string().min(8).max(64),
    oldPassword: Joi.string().min(8).max(64),
    gender: Joi.string().valid('male', 'female'),
    token: Joi.string().required()
});

export const avatarUserSchema = Joi.object({
    avatarUrl: Joi.string().required(),
    token: Joi.string().required()
});