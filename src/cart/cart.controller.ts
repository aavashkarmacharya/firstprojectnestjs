import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { cartservice } from './cart.service';
import { AddToCartDto } from './addtocartdto';
import { CartDeletionDto } from './cartdeletion.dto';
import { JwtAuthGuard } from '../auth/passport-local.guard';

@Controller('/cart')
export class cartcontroller {
  constructor(private cartservice: cartservice) {}

  @Post('AddToCart/:id')
  async addtocart(@Param('id') id: number, @Body() dto: AddToCartDto) {
    return await this.cartservice.addToCart(id, dto);
  }
  @Get('getcart/:id')
  async getcart(@Param('id') id: number) {
    return await this.cartservice.getcart(id);
  }
  @Delete('/removefromcart/:id')
  async removefromcart(@Param('id') id: number, @Body() dto: CartDeletionDto) {
    return await this.cartservice.deletefromcart(id, dto);
  }
}
