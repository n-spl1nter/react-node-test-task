import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../config/types/role';

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async  create(createUserDto: CreateUserDto, userId: number, userRole: Role) {
    const existedUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existedUser) {
      throw new BadRequestException('User is already registered');
    }
    const role = userRole === Role.ADMIN ? Role.DEALER : Role.CUSTOMER;

    const userEntity = this.userRepository.create({
      email: createUserDto.email,
      role,
      password: await hash(createUserDto.password, 12)
    });

    return this.userRepository.save(userEntity);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async remove(id: number, userId: number, userRole: Role) {
    const existedUser = await this.userRepository.findOne({ where: { id } });
    if (!existedUser) {
      throw new NotFoundException('User not found');
    }
    if (userRole !== Role.ADMIN && existedUser.createdBy.id !== userId) {
      throw new ForbiddenException('No access to user');
    }

    await this.userRepository.delete({ id })
    return null;
  }
}
