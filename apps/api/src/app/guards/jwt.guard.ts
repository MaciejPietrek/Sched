import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  override handleRequest(err: any, user: any, info: any, context: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(err || user);
    }
    return user;
  }
}
