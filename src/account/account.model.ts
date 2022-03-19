import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const AccountSchema = new mongoose.Schema({
  account: { type: String, required: true }, // Bank/Cash
  accountName: { type: String, required: true }, // Income/expense
  accountType: { type: String, required: true }, // income/expense type
  accountBalance: { type: Number, required: true },
  accountTime: { type: String },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: false,
  },
});

export interface Account {
  accountName: string;
  accountBalance: string;
  accountType: string;
  userId: string;
}
