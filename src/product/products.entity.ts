import { IsNotEmpty, minDate, MinLength, minLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class product {
  @PrimaryGeneratedColumn()
  productid: number;
  @IsNotEmpty()
  @MinLength(3)
  @Column()
  productname: string;
  @MinLength(5)
  @Column()
  discription: string;
  @Column('decimal', { scale: 2 })
  price: number;
  @Column()
  stock: number;
}
