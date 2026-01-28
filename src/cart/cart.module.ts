import { Module } from '@nestjs/common';
import { cartcontroller } from './cart.controller';
import { usermodule } from 'src/user/user.module';
import { cartservice } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cartentity } from './cart.entity';
import { cartitem } from './cart-item.entity';
import { productmodule } from 'src/product/products.module';
import { product } from 'src/product/products.entity';
import { AddToCartDto } from './addtocartdto';

@Module({
  imports: [
    TypeOrmModule.forFeature([cartentity, cartitem, product]),
    usermodule,
    productmodule,
  ],
  controllers: [cartcontroller],
  providers: [cartservice],
})
export class cartmodule {}
