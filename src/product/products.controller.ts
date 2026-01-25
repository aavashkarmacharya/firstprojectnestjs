import { Body, Controller, Post } from '@nestjs/common';
import { product } from './products.entity';
import { productservice } from './products.service';

@Controller('/product')
export class productcontroller {
  constructor(private productservice: productservice) {}
  @Post('/createproduct')
  async createproduct(@Body() dto: product) {
    return await this.productservice.createproduct(dto);
  }
}
