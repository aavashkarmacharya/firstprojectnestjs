import { Optional } from '@nestjs/common';
import { MESSAGES } from '@nestjs/core/constants';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { genders } from 'src/common/enums/gender.enum';
import { roles } from 'src/common/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @IsNotEmpty()
  @Column()
  password: string;
  @IsNotEmpty()
  @IsEnum(genders, { message: 'Gender not in enum parameter' })
  @Column({ type: 'enum', enum: genders, default: genders.male })
  gender: genders;
  @Optional()
  @Column({ type: 'enum', enum: roles, default: roles.user })
  roles: roles;
}
