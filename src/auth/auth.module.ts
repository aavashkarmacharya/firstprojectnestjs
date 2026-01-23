import { Module } from '@nestjs/common';
import { usermodule } from 'src/user/user.module';
import { authcontroller } from './auth.controller';
import { authservice } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtconstants } from './jwt.constants';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtconstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    usermodule,
  ],
  controllers: [authcontroller],
  providers: [authservice, JwtStrategy],
})
export class authmodule {}
