// src/modules/auth/auth.model.ts

import mongoose, { Schema } from "mongoose";
import { IUser } from "./auth.interface.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // নিচের ফিল্ডগুলো যোগ করুন:
    phone: { type: String },
    photo: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("User", userSchema, "user");