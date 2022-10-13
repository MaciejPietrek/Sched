import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IUserLogin } from '../auth/user.interface';

const unauthorized = new UnauthorizedException();
const noLogin = new UnauthorizedException(undefined, 'No login provided');
const noPassword = new UnauthorizedException(undefined, 'No password provided');

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(user: IUserLogin): Promise<any> {
    Logger.log('LocalStrategy');
    if (!user) return unauthorized;
    if (!user.username) return noLogin;
    if (!user.passwordHash) return noPassword;

    return user;
  }
}
