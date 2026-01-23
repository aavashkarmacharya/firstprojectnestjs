import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { user } from './user.entity';
import { Repository } from 'typeorm';
import { roles } from '../common/enums/roles.enum';
import { error } from 'node:console';

@Injectable()
export class userservice {
  constructor(
    @InjectRepository(user)
    private readonly UserRepo: Repository<user>,
  ) {}
  async getusers(dto: user) {
    const value = this.UserRepo.create(dto);
    return await this.UserRepo.save(value);
  }
  async getuserbyusername(username: string): Promise<user | null> {
    const user = await this.UserRepo.findOne({
      where: { username },
    });
    return user;
  }
  async getuserbyid(id: number): Promise<user | null> {
    const user = this.UserRepo.findOne({
      where: { id },
    });
    return user;
  }
  async getalluser() {
    return this.UserRepo.find();
  }
  async makeadmin(id: number): Promise<user> {
    const target = await this.UserRepo.findOne({
      where: { id },
    });
    if (!target) {
      throw new error();
    }
    target.roles = roles.admin;
    return this.UserRepo.save(target);
  }
}
