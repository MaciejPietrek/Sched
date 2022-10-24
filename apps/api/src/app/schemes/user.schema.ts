import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: String,
  passwordHash: String,
  email: String,
  groups: Array, //Array<string>
  tags: Array, //Array<string>
});
