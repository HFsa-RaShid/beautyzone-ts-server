import { generateAccessTokens, generateRefreshTokens } from '../../utils/generateTokens.js';
import { User } from './auth.model.js';
import bcrypt from 'bcrypt';


export const registerUserDB = async (data: any) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) throw new Error("Email already exists!");

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashedPassword });
  
  const accessToken = generateAccessTokens(user);
  const refreshToken = generateRefreshTokens(user);
  
  user.refreshToken = refreshToken;
  await user.save();
  
  return { user, accessToken, refreshToken };
};

export const loginUserDB = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  // console.log("Found User:", user);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }
  
  const accessToken = generateAccessTokens(user);
  const refreshToken = generateRefreshTokens(user);
  
  user.refreshToken = refreshToken;
  await user.save();
  
  return { user, accessToken, refreshToken };
};


export const changePasswordDB = async (userId: string, currentPassword: string, newPassword: string) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // Verify old password
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) throw new Error("Incorrect current password");

  // Hash and update to new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  
  user.password = hashedPassword;
  await user.save();
  
  return { message: "Password updated successfully" };
};