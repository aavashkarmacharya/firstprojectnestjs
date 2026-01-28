import { IsNotEmpty } from 'class-validator';
import { product } from 'src/product/products.entity';
import { user } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { cartitem } from './cart-item.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class cartentity {
  @ApiProperty({ description: 'Unique ID of the cart', example: 1 })
  @PrimaryGeneratedColumn()
  cartid: number;

  @ApiProperty({
    description: 'User who owns the cart',
    type: () => user,
    example: { id: 1, username: 'john_doe' },
  })
  @OneToOne(() => user)
  @JoinColumn()
  user: user;

  @ApiProperty({
    description: 'List of items in the cart',
    type: () => [cartitem],
    example: [{ id: 1, productid: 2, quantity: 3 }],
  })
  @OneToMany(() => cartitem, (item) => item.cart)
  items: cartitem[];
}
