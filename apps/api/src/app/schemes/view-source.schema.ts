import { Schema } from 'mongoose';

export const ViewSourceSchema = new Schema({
  name: String,
  structure: Object,
  options: {
    collection: String,
    strict: Boolean,
  },
});

export interface IViewSource {
  _id: string;
  name: string;
  structure: Object;
  options: {
    collection: string;
    strict: boolean;
  };
}
