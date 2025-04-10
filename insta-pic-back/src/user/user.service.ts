import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

  users:CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return this.users;
  }

  findAll() {
    return this.users;
  }

  findOne(username:string) {
    return this.users.filter(user=>user.username===username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
