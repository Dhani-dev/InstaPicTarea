import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {

  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>
  ) { }

  create(createPhotoDto: CreatePhotoDto) {
    return `This action create a user`;
  }

  findAll() {
    return this.photoRepository.find();
  }

  findOne(username:string) {
    return `This action find a #${username} user`;
  }

  update(id: number, updateUserDto: UpdatePhotoDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


