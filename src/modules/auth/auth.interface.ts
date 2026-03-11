// src/modules/auth/auth.interface.ts

import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;     
  photo?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  accessToken?: string;
  refreshToken?: string;
}