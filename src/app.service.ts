import { Injectable } from '@nestjs/common';
import { UserModel } from './module/auth/models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppService {
  constructor(){ }
  SayHello(){
    return {
      success:true,
      message:"Hello from API"
    }
  }
}
