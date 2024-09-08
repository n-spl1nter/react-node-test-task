import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles';
import { Role } from '../config/types/role';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.ADMIN, Role.DEALER)
  @UseGuards(AuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto, @Req() request) {
    const { user } = request;
    return this.userService.create(createUserDto, user.id, user.role);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request) {
    const { password, ...user } = await this.userService.findOne(request.user.id);
    return user;
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.DEALER)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string, @Req() request) {
    const { user } = request;
    return this.userService.remove(+id, user.id, user.role);
  }
}
