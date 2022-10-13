import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-contants';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { LocalStrategy } from '../strategy/local.strategy';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

const models = [{ name: 'User', schema: UserSchema }];

@Module({
  imports: [
    MongooseModule.forFeature(models),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
    UserService,
  ],
  exports: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, UserService],
})
export class AuthModule {}
