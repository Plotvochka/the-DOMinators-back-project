import bcrypt from 'bcrypt';
import { UsersCollection } from "../db/models/user.js";
import createHttpError from 'http-errors';
import { ONE_DAY, FIFTEEN_MINUTES } from '../constants/index.js';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
import { JWT } from '../constants/index.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';
import { SMTP } from '../constants/index.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';

export const singUpUser = async (payload) => {
   
    const user = await UsersCollection.findOne({ email: payload.email });
    if (user) throw createHttpError(409, 'Email is already in use');

  
    const encryptedPassword = await bcrypt.hash(payload.password, 10);


    return await UsersCollection.create({
        ...payload,
        password: encryptedPassword,
    });
};

export const singInUser = async (payload) => {

    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) throw createHttpError(404, 'User not found');

 
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) throw createHttpError(401, 'Invalid email or password');

    await SessionCollection.deleteOne({ userId: user._id });


    const session = createSession();
    return await SessionCollection.create({
        userId: user._id,
        ...session,
    });
};


export const logOutUser = async (sessionId) => {

    const session = await SessionCollection.findOne({ _id: sessionId });
    if (!session) throw createHttpError(404, 'Session not found');


    await SessionCollection.deleteOne({ _id: sessionId });
};


export const createSession = () => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    return {
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    };
};

export const requestResetToken = async(email)=>{
const user = await UsersCollection.findOne({email});
if(!user){
    throw createHttpError(404, 'User not found');
}
const resetToken = jwt.sign(
{
    sub:user._id,
    email,
},
env('JWT_SECRET'),
{
    expiresIn: '15m',
},
);
const resetPasswordTemplatePath = path.join(TEMPLATES_DIR,
    'reset-password-email.html',);

const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
).toString();
const template = handlebars.compile(templateSource);
const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  
    let entries;
    try {
      entries = jwt.verify(payload.token, env(JWT.JWT_SECRET));
    } catch (error) {
      if (error instanceof Error) throw createHttpError(401, error.message);
      throw error;
    }
  
 
    const user = await UsersCollection.findOne({
      email: entries.email,
      _id: entries.sub,
    });
  
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
  

 

    const encryptedPassword = await bcrypt.hash(payload.newPassword, 10);
  

    await UsersCollection.updateOne(
      { _id: user._id },
      { password: encryptedPassword },
    );
  

    await SessionCollection.deleteOne({ _id: entries.sessionId });
  };
  