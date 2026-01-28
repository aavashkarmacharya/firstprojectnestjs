import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { cartentity } from './cart.entity';
import { product } from 'src/product/products.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class cartitem {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => cartentity, (cartentity) => cartentity.items)
  cart: cartentity;
  @ManyToOne(() => product)
  product: product;
  @IsNotEmpty()
  @Column()
  quantity: number;
}
