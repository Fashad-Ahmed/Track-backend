import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export interface Auth {
  userName: string;
  email: string;
  password: string;
}
