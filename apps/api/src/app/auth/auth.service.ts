import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtToken } from './jwt-token.interface';
import { IUserLogin, IUser } from './user.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  public async verify(user: IJwtToken) {
    return true;
  }

  public async authorize(user: IUserLogin) {
    const userResult = await this.userService.getUser(user);

    if (!userResult) return null;
    else {
      const userCopy = copy(userResult);
      return this.createJwt(userCopy);
    }
  }

  public extendJwt(token: IJwtToken) {
    const tokenCopy = { ...token };
    //@ts-ignore
    delete tokenCopy.exp;
    //@ts-ignore
    delete tokenCopy.iat;
    const accessToken = this.jwtService.sign(tokenCopy, { expiresIn: '1h' });
    return {
      token: accessToken,
      //@ts-ignore
      expiration: this.jwtService.decode(accessToken)['exp'] as number,
    };
  }

  private createJwt(user: IUser) {
    const userCopy = { ...user };
    //@ts-ignore
    delete userCopy['passwordHash'];
    //@ts-ignore
    delete userCopy['__v'];
    //@ts-ignore
    delete userCopy['_id'];
    const accessToken = this.jwtService.sign(userCopy, { expiresIn: '1h' });
    return {
      token: accessToken,
      //@ts-ignore
      expiration: this.jwtService.decode(accessToken)['exp'] as number,
    };
  }
}

const copy = (object: object) => JSON.parse(JSON.stringify(object));
