import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '../entity/user.entity';
import { UserService } from '../service/user.service';
import { DeleteResult } from 'typeorm';

@Controller('/usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findUserByName(@Param('name') name: string): Promise<User[]> {
    return this.userService.findUserByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() user: User): Promise<User> {
    return this.userService.updateUser(user);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
