import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Public } from 'src/auth/public.decorator';
import { User } from 'src/auth/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async find(@User() user): Promise<Users> {
    return await this.usersService.findOne(user.sub);
  }

  @Get('/all')
  async findAll(): Promise<Users[]> {
    return await this.usersService.findAll();
  }

  @Public()
  @Post()
  async create(@Body() user: Users): Promise<Users> {
    return await this.usersService.create(user);
  }
}
