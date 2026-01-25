import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { roles } from '../common/enums/roles.enum';
import { error } from 'node:console';
import { user } from './user.entity';

@Injectable()
export class userservice {
  constructor(
    @InjectRepository(user)
    private readonly UserRepo: Repository<user>,
  ) {}
  /*
  async getusers(dto: user) {
    const value = this.UserRepo.create(dto);
    return await this.UserRepo.save(value);
  }
    */
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
      throw new ConflictException('User doesnt exists');
    }
    target.roles = roles.admin;
    return this.UserRepo.save(target);
  }

  async register(dto: user): Promise<user> {
    const existinguser = await this.UserRepo.findOne({
      where: { email: dto.email },
    });
    if (existinguser) {
      throw new ConflictException('user already exist');
    }
    {
      const createnewuser = this.UserRepo.create(dto);
      return await this.UserRepo.save(createnewuser);
    }
  }

  async getUserByEmail(email: string): Promise<user | null> {
    return await this.UserRepo.findOne({
      where: { email },
    });
  }
}
