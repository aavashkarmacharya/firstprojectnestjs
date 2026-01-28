import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { userservice } from './user.service';
import { user } from './user.entity';
import { JwtAuthGuard } from '../auth/passport-local.guard';
import { roleguard } from 'src/auth/roles.guard';
import { roles } from 'src/common/enums/roles.enum';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class usercontroller {
  constructor(private userservice: userservice) {}

  @Post('register')
  async createuser(@Body() dto: user) {
    return await this.userservice.register(dto);
  }
  /*  @Get('/getuser/:username')
  async getuserbyusername(@Param('username') username: string) {
    return await this.userservice.getuserbyusername(username);
  }
    */
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('/getalluser')
  async getuser() {
    return this.userservice.getalluser();
  }

  @Roles(roles.admin)
  @UseGuards(roleguard)
  @UseGuards(JwtAuthGuard)
  @Patch('/makeadmin/:id')
  async makeadmin(@Param('id') id: number) {
    return this.userservice.makeadmin(id);
  }
}
