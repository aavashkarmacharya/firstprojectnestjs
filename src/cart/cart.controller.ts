import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { cartservice } from './cart.service';
import type { AddToCartdto } from './addtocartdto';

@Controller('/cart')
export class cartcontroller {
  constructor(private cartservice: cartservice) {}
  @Post('AddToCart/:id')
  async addtocart(@Param('id') id: number, @Body() dto: AddToCartdto) {
    return await this.cartservice.addToCart(id, dto);
  }
  @Get('getcart/:id')
  async getcart(@Param('id') id: number) {
    return await this.cartservice.getcart(id);
  }
}
