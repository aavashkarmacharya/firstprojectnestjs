import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { product } from './products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class productservice {
  constructor(
    @InjectRepository(product)
    private readonly ProductRepo: Repository<product>,
  ) {}
  async createproduct(dto: product): Promise<product> {
    return await this.ProductRepo.save(dto);
  }
}
