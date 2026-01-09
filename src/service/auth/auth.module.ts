import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([UserModel])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
