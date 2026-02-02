import { Module } from '@nestjs/common';
import { productcontroller } from './products.controller';
import { productservice } from './products.service';
import { usermodule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './products.entity';
import { cartmodule } from 'src/cart/cart.module';
import { cartitem } from 'src/cart/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([product, cartitem]), usermodule],
  controllers: [productcontroller],
  providers: [productservice],
})
export class productmodule {}
