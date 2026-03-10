import { Request, Response } from 'express';
import * as AuthService from './auth.service.js';
import { User } from './auth.model.js';
import jwt from 'jsonwebtoken';
import config from '../../config/index.js';
import { sendError, sendSuccess } from '../../utils/responseHelper.js';

export const register = async (req: Request, res: Response) => {
  try {
    const data = await AuthService.registerUserDB(req.body);
    res.cookie("accessToken", data.accessToken, { httpOnly: true, secure: false });
    res.cookie("refreshToken", data.refreshToken, { httpOnly: true, secure: false });
    sendSuccess(res, { user: data.user }, "User created successfully");
  } catch (err: any) {
    sendError(res, err.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.loginUserDB(email, password);
    res.cookie("accessToken", data.accessToken, { httpOnly: true, secure: false });
    res.cookie("refreshToken", data.refreshToken, { httpOnly: true, secure: false });
    sendSuccess(res, { user: data.user }, "Logged in successfully");
  } catch (err: any) {
    sendError(res, err.message, 401);
  }
};

export const currentUser = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return sendError(res, "Unauthorized", 401);
    const decoded: any = jwt.verify(token, config.jwt_access_secret as string);
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    sendSuccess(res, { user });
  } catch (err) {
    sendError(res, "Forbidden", 403);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  sendSuccess(res, null, "Logged out successfully");
};