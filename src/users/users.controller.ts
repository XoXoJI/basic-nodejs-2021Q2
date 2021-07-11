import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, ClassSerializerInterceptor, NotFoundException, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const user = await this.usersService.findOne(userId);

    if(!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  // Может быть придеться заменить на Put
  @Put(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    const user =  await this.usersService.update(userId, updateUserDto);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    const result = await this.usersService.remove(userId);

    if (!result?.affected) {
      throw new NotFoundException('task not found');
    }

    return;
  }
}
