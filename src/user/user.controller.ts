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
import { dot } from 'node:test/reporters';
import { stringify } from 'querystring';
import { get } from 'http';
import { JwtAuthGuard } from '../auth/passport-local.guard';

@Controller('/user')
export class usercontroller {
  constructor(private readonly userservice: userservice) {}
  @Post('/create')
  async createuser(@Body() dto: user) {
    return await this.userservice.getusers(dto);
  }
  /*  @Get('/getuser/:username')
  async getuserbyusername(@Param('username') username: string) {
    return await this.userservice.getuserbyusername(username);
  }
    */
  @UseGuards(JwtAuthGuard)
  @Get('/getalluser')
  async getuser() {
    return this.userservice.getalluser();
  }
  @Patch('/makeadmin/:id')
  async makeadmin(@Param('id') id: number) {
    return this.userservice.makeadmin(id);
  }
}
