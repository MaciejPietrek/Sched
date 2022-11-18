import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { UserSchema } from '../schemes/user.schema';
import { ViewSourceSchema } from '../schemes/view-source.schema';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { LocalStrategy } from '../strategy/local.strategy';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt-contants';
import { UserService } from './user.service';

const models = [
  { name: 'User', schema: UserSchema },
  { name: 'ViewSource', schema: ViewSourceSchema },
];

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
