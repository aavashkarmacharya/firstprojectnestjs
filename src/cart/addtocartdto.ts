import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ description: 'ID of the product to add', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  productid: number;

  @ApiProperty({
    description: 'Quantity of the product to add',
    example: 3,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  productquantity: number;
}
