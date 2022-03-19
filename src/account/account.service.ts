import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from './account.model';
import { Auth } from 'src/auth/auth.model';

@Injectable()
export class AccountService {
  products: Account[] = [];
  constructor(
    @InjectModel('Account') private readonly accountModel: Model<Account>,
    @InjectModel('Auth') private readonly authModel: Model<Auth>,
  ) {}
  async createAccount(req): Promise<any> {
    console.log('account request started');
    console.log('account -->', req);

    try {
      const newAccount = await new this.accountModel({
        account: req.account,
        accountName: req.accountName,
        accountType: req.accountType,
        accountBalance: req.accountBalance,
        accountTime: req.accountTime,
        userId: req.userId,
      });

      const account = await this.accountModel.create(newAccount);
      return { ...account, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }

  async showAccounts(req): Promise<any> {
    console.log('account request started', req);

    try {
      const getAccounts = await this.accountModel
        .find({ userId: req.userId })
        .populate('userId', '', this.accountModel)
        .exec();

      console.log(getAccounts);

      return { getAccounts, statusCode: 200 };
    } catch (error) {
      console.log(error);
      throw [404, error.message];
    }
  }
}
