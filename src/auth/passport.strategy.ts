// jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { jwtconstants } from './jwt.constants';
import { jwtpayload } from './passport.interface';
import { userservice } from '../user/user.service';
import { validationdata } from './validateuser.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userservice: userservice) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtconstants.secret,
    });
  }

  async validate(payload: jwtpayload): Promise<validationdata> {
    const validateuser = await this.userservice.getuserbyid(payload.sub);
    if (!validateuser) {
      throw new UnauthorizedException();
    }
    return {
      id: validateuser.id,
      username: validateuser.username,
      roles: validateuser.roles,
    };
  }
}
