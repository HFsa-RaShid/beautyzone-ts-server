import jwt from 'jsonwebtoken';
import { IUser } from '../modules/auth/auth.interface.js';
import config from '../config/index.js';

export const generateAccessTokens = (user: IUser) => {
  return jwt.sign(
    { id: user._id },
    config.jwt_access_secret as string,
    { expiresIn: "1h" }
  );
};

export const generateRefreshTokens = (user: IUser) => {
  return jwt.sign(
    { id: user._id },
    config.jwt_refresh_secret as string,
    { expiresIn: "7d" }
  );
};