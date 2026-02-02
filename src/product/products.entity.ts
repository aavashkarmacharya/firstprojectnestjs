import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class product {
  //@ApiProperty({ description: 'Unique ID of the product', example: 1 })
  @PrimaryGeneratedColumn()
  productid: number;

  @ApiProperty({ description: 'Name of the product', example: 'Gaming Laptop' })
  @IsNotEmpty()
  @MinLength(3)
  @Column()
  productname: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'High-end gaming laptop with RTX 5050',
  })
  @MinLength(5)
  @Column()
  discription: string;

  @ApiProperty({ description: 'Price of the product', example: 1499.99 })
  @Column('decimal', { scale: 2 })
  price: number;

  @ApiProperty({ description: 'Stock quantity of the product', example: 10 })
  @Column()
  stock: number;
}
