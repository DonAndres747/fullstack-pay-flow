import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transaction } from 'typeorm';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transaction.controller'
import { ProductModule } from '../product/product.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => ProductModule),
    forwardRef(() => CustomerModule),
  ],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule { }
 