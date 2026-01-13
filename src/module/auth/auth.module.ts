import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/module/user/models/user.model';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from "@nestjs/jwt"
@Module({
  imports: [SequelizeModule.forFeature([UserModel]),
  JwtModule.register({})
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController]
})
export class AuthModule { }
