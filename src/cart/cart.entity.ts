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

@Entity()
export class cartentity {
  @PrimaryGeneratedColumn()
  cartid: number;
  @OneToOne(() => user)
  @JoinColumn()
  user: user;
  @OneToMany(() => cartitem, (item) => item.cart)
  items: cartitem[];
}
