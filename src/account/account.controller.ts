import { Controller, Post, Body, Req, Get, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';

@Controller('account')
export class AccountController {
  constructor(private readonly accountervice: AccountService) {}

  @Post('create')
  async create(@Req() request: Request) {
    try {
      const res = await this.accountervice.createAccount(request.body);
      return {
        result: res,
      };
    } catch (error) {
      return error;
    }
  }

  @Get('show')
  async show(@Query('accountName') accountName: any): Promise<any> {
    return this.accountervice.showAccounts(accountName);
  }
}
