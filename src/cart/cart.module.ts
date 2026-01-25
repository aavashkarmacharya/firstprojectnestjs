import { Module } from '@nestjs/common';
import { cartcontroller } from './cart.controller';
import { usermodule } from 'src/user/user.module';
import { cartservice } from './cart.service';

@Module({
  imports: [usermodule],
  controllers: [cartcontroller],
  providers: [cartservice],
})
export class cartmodule {}
