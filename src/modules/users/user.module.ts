import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

import { AuthService } from '../users/auth/auth.service';
import { LocalStrategy } from '../users/auth/local.strategy';
import { JwtStrategy } from '../users/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../users/auth/constants';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),        
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
  controllers: [UserController],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
})
export class UserModule {}
