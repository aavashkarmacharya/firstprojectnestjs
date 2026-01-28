import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { product } from './products.entity';
import { productservice } from './products.service';

@Controller('/product')
export class productcontroller {
  constructor(private productservice: productservice) {}
  @Post('/createproduct')
  async createproduct(@Body() dto: product) {
    return await this.productservice.createproduct(dto);
  }
  @Get('getallproducts')
  async getproducts() {
    return await this.productservice.listallproduct();
  }

  @Get('getproduct/:product')
  async getproductbyname(@Param('product') product: string) {
    return await this.productservice.getproductbyname(product);
  }
  @Delete('deleteproduct/:id')
  async deleteproductbyid(@Param('id') id: number) {
    return await this.productservice.deleteproduct(id);
  }
  @Patch('updateproduct/:id')
  async updateproduct(@Param('id') id: number, @Body() dto: product) {
    return await this.productservice.updatproduct(id, dto);
  }
}
