import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './auth.model';

import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  products: Auth[] = [];
  constructor(@InjectModel('Auth') private readonly authModel: Model<Auth>) {}

  async signin(email: any, password: any) {
    console.log('sign in');
    try {
      console.log('signin body', email, password);

      try {
        const userExist = await this.authModel.findOne({ email: email });
        if (!userExist) {
          throw new NotFoundException('User does not exist');
        }

        // console.log(bcrypt.compareSync(password, userExist.password));
        // console.log(!bcrypt.compareSync(password, userExist.password));

        // if (!bcrypt.compareSync(password, userExist.password)) {
        //   console.log('Wrong password');
        //   throw new NotFoundException('Wrong Password');
        // }

        if (password != userExist.password) {
          console.log('Invalid credentials');
          throw [404];
        }

        const user = {
          userExist,
        };
        return { ...user, statusCode: 200 };
      } catch (error) {
        throw [404, error.message];
      }
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async saveUser(userName: any, email: any, password: any): Promise<any> {
    try {
      console.log('save admin new user', userName, email, password);
      const uniqueMail = await this.authModel.findOne({ email: email });
      console.log(uniqueMail);
      if (!uniqueMail) {
        console.log('save admin new user', userName, email, password);

        // const bcryptPass = bcrypt.hashSync(password, 8);
        // console.log('bcrypt pass', bcryptPass);

        const newAdminUser = new this.authModel({
          userName,
          email,
          password,
        });

        const result = await newAdminUser.save();
        console.log(result);
        return result;
      } else {
        return 'User Already Exist';
      }
    } catch (error) {
      console.log('error', error);
      throw [404, 'something went wrong'];
    }
  }
}