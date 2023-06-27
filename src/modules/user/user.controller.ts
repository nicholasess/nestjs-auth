import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.interface';

export class UserController {
  constructor(private service: UserService) {}

  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post('create')
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Get('list')
  list() {
    return this.service.list();
  }

  @Put('update')
  update(@Body() user: User) {
    return this.service.update(user);
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
