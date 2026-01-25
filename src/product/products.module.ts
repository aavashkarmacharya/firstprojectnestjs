import { Module } from '@nestjs/common';
import { productcontroller } from './products.controller';
import { productservice } from './products.service';
import { usermodule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([product]), usermodule],
  controllers: [productcontroller],
  providers: [productservice],
})
export class productmodule {}
