import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { cartentity } from './cart.entity';
import { product } from 'src/product/products.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class cartitem {
  @ApiProperty({ description: 'Unique ID of the cart item', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The cart this item belongs to',
    type: () => cartentity,
    example: { cartid: 1 },
  })
  @ManyToOne(() => cartentity, (cartentity) => cartentity.items)
  cart: cartentity;

  @ApiProperty({
    description: 'Product associated with this cart item',
    type: () => product,
    example: { productid: 2, productname: 'Gaming Laptop' },
  })
  @ManyToOne(() => product)
  product: product;

  @ApiProperty({
    description: 'Quantity of the product in the cart',
    example: 3,
  })
  @IsNotEmpty()
  @Column()
  quantity: number;
}
