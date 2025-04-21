import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-request.dto';
import { LoginDto } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {


    users:SignUpDto[] = [
        { username: 'jjzapata123', password:'1234', name:'Julian', email:'jjzapata123@google.com'}
    ];


    login(loginDto: LoginDto) {
        const user = this.users.find(user=>user.username===loginDto.username && user.password===loginDto.password);
        if(!user){
            throw new NotFoundException('Invalid credentials');
        }
        return {
            success:true,
            token:'123456'
        }
    }


    signUp(signUpDto: SignUpDto):LoginResponse {
        const user = this.users.find(user=>user.username===signUpDto.username);
        if(user){
            throw new BadRequestException('User already exists');
        }
        this.users.push(signUpDto);
        return {
            success:true,
            token:'123456'
        }
    }
}
