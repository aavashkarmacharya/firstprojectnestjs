import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CartDeletionDto {
  @ApiProperty({ description: 'ID of the product to remove', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  productid: number;

  @ApiProperty({ description: 'Quantity to remove', example: 1, minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
