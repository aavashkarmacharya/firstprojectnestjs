import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { usercontroller } from './user.controller';
import { userservice } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  exports: [userservice],
  imports: [TypeOrmModule.forFeature([user]), PassportModule],
  controllers: [usercontroller],
  providers: [userservice],
})
export class usermodule {}
