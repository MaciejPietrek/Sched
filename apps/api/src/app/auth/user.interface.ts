export interface IUserLogin {
  username: string;
  passwordHash: string;
}

export type IUserID = string;

export interface IUser {
  _id: IUserID;
  username: string;
  passwordHash: string;
  email: string;
  groups: string[];
  tags: string[];
}
