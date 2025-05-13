import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoto } from './create-photo.dto';

export class UpdatePhotoDto extends PartialType(CreatePhoto) {}
