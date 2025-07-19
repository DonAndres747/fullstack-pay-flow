import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './shared/database/typeorm.config';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transactions/transaction.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    ProductModule,
    TransactionModule,
    CustomerModule
  ],
})
export class AppModule { }
