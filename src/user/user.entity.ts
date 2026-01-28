import { Optional } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { genders } from 'src/common/enums/gender.enum';
import { roles } from 'src/common/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {
  @ApiProperty({ description: 'Unique ID of the user', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
  @Column()
  username: string;

  @ApiProperty({ description: 'Password for the user', example: 'P@ssw0rd' })
  @IsNotEmpty()
  @Column()
  password: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: genders,
    example: genders.male,
  })
  @Optional()
  @IsEnum(genders, { message: 'Gender not in enum parameter' })
  @Column({ type: 'enum', enum: genders, default: genders.male })
  gender: genders;

  @ApiProperty({
    description: 'Location of the user',
    example: 'Kathmandu, Nepal',
  })
  @IsNotEmpty()
  @Column()
  location: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    description: 'Role of the user',
    enum: roles,
    example: roles.user,
  })
  @Optional()
  @Column({ type: 'enum', enum: roles, default: roles.user })
  roles: roles;
}
