import { Injectable } from '@nestjs/common';
import { UserModel } from './models/user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AppService {
  constructor(@InjectModel(UserModel) private readonly userModel:typeof UserModel){}  
  
}
