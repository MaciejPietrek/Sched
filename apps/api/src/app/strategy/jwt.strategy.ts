import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../auth/jwt-contants';
import { IJwtToken } from '../auth/jwt-token.interface';

const unauthorized = new UnauthorizedException();
const noLogin = new UnauthorizedException(undefined, 'No login provided');
const noPassword = new UnauthorizedException(undefined, 'No password provided');
const invalidCredentials = new UnauthorizedException(
  undefined,
  'Invalid credentials'
);

const no = (field: string) =>
  new UnauthorizedException(undefined, `Invalid token | no ${field} field`);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: IJwtToken): Promise<IJwtToken> {
    Logger.log('JwtStrategy');

    if (!user) throw unauthorized;
    if (!user.username) throw no('username');
    if (!user.email) throw no('email');
    if (!user.groups) throw no('groups');
    if (!user.tags) throw no('tags');
    if (!user.exp) throw no('exp');
    if (!user.iat) throw no('iat');
    return user;
  }
}
