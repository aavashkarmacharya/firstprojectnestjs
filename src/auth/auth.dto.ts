import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

// Request DTO (unchanged)
export class inputdata {
  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    minLength: 3,
    example: 'P@ss123',
  })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

// Swagger-ready response class for returning user info
export class ReturndataDto {
  @ApiProperty({ description: 'ID of the user', example: 1 })
  id: number;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  username: string;
}

// Swagger-ready response class for signin data
export class SignindataDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accesstoken: string;

  @ApiProperty({ description: 'ID of the user', example: 1 })
  id: number;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  username: string;
}
