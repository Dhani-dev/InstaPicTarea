import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [UserModule, AuthModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
