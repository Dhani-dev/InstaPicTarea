import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-request.dto';
import { LoginDto } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}


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
            token:this.getToken(user)
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
            token:this.getToken(signUpDto)
        }
    }

    private getToken(user:SignUpDto):string{
        return this.jwtService.sign({
          username:user.username,
          email:user.email
        });
      }
}
