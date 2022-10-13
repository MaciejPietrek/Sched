import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepo } from './generic-repo';
import { IUser, IUserID, IUserLogin } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly User: Model<IUser>) {}
  repo = new GenericRepo(this.User);

  public async getUserByID(id: IUserID) {
    Logger.log('getUserByID', 'UserService');
    return this.repo.getByID(id);
  }

  public async getUser(user: IUserLogin) {
    Logger.log('getUser', 'UserService');
    return this.repo.findOneByFields(Object.entries(user));
  }
}
