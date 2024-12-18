import bcrypt from 'bcrypt';
import UserInfoCollection from '../db/models/UserInfo.js';
import createHttpError from 'http-errors';
import { ONE_DAY, FIFTEEN_MINUTES } from '../constants/index.js';
import { SessionCollection } from '../db/models/session.js';
import { randomBytes } from 'crypto';
// import { JWT } from '../constants/index.js';
// import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';
import { SMTP } from '../constants/index.js';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';

export const singUpUser = async (payload) => {
  const user = await UserInfoCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email is already in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UserInfoCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const singInUser = async (payload) => {
  const user = await UserInfoCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  // const isEqual = await bcrypt.compare(payload.password, user.password);
  // if (!isEqual) throw createHttpError(401, 'Invalid email or password'); //це для нас не потрібно, це має зробити фронт чисто для себе і для користувача

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

export const requestResetToken = async (email) => {
  const user = await UserInfoCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const temporaryPassword = randomBytes(4).toString('hex');

  const encryptedPassword = await bcrypt.hash(temporaryPassword, 10);
  await UserInfoCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    password: temporaryPassword,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Your temporary password',
    html,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: session._id });

  const newSession = createSession();

  return SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};
