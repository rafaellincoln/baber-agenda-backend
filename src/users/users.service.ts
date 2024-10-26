import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<Users | null> {
    const users = await this.usersRepository.find({
      select: { email: true, id: true, isActive: true, name: true, password: true },
      where: { email },
      take: 1,
    })

    return users?.[0];
  }

  findOne(id: number): Promise<Users | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: Users): Promise<Users> {
    return this.usersRepository.save(user)
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
