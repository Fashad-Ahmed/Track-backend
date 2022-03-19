import { Controller, Post, Body, Req, Get, Param } from '@nestjs/common';
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

  @Post('show')
  async show(@Req() request: Request) {
    return this.accountervice.showAccounts(request.body);
  }
}
