import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from './products.entity';
import { Repository } from 'typeorm';
import { error } from 'node:console';

@Injectable()
export class productservice {
  constructor(
    @InjectRepository(product)
    private readonly ProductRepo: Repository<product>,
  ) {}
  async createproduct(dto: product): Promise<product> {
    return await this.ProductRepo.save(dto);
  }
  async updatproduct(id: number, dto: product) {
    const updatedproduct = this.ProductRepo.update(id, dto);
    return await updatedproduct;
  }
  async deleteproduct(id: number) {
    return await this.ProductRepo.delete({ productid: id });
  }
  async getproductbyname(name: string): Promise<product[]> {
    const product = await this.ProductRepo.find({
      where: { productname: name },
    });
    if (!product) {
      throw new error('no product found');
    }
    return product;
  }
}
