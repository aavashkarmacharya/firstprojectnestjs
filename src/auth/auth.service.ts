import { Injectable, UnauthorizedException } from '@nestjs/common';
import { userservice } from 'src/user/user.service';
import { inputdata, ReturndataDto, SignindataDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class authservice {
  constructor(
    private userservice: userservice,
    private jwtservice: JwtService,
  ) {}
  async verifyuser(dto: inputdata): Promise<SignindataDto | null> {
    const checkuser = await this.userservice.getuserbyusername(dto.username);
    if (checkuser && checkuser.password === dto.password) {
      return await this.generatetoken(checkuser);
    }
    throw new UnauthorizedException('incorrect data sent!');
  }
  async generatetoken(dto: ReturndataDto): Promise<SignindataDto | null> {
    const tokenpayload = {
      sub: dto.id,
      username: dto.username,
    };
    const accesstoken = await this.jwtservice.signAsync(tokenpayload);
    return {
      accesstoken,
      id: dto.id,
      username: dto.username,
    };
  }
}
