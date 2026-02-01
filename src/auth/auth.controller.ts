import { Controller, Get, Body, Post } from '@nestjs/common';
import { get } from 'http';
import { user } from '../user/user.entity';
import { authservice } from './auth.service';
import { inputdata } from './auth.dto';

@Controller('/auth')
export class authcontroller {
  constructor(private readonly authservice: authservice) {}
  @Post('/login')
  async getauthtoken(@Body() dto: inputdata) {
    return this.authservice.verifyuser(dto);
  }
}
