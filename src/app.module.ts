import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { SequelizeModule } from "@nestjs/sequelize"
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';
import { UserModule } from './module/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect:"postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      autoLoadModels: true
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
