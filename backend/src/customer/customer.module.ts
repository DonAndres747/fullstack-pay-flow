import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from './entities/customer.entity';
import { CustomerService } from './services/customer.service';
import { CustomerController } from './controllers/customer.controller';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        forwardRef(() => TransactionModule),
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
})
export class CustomerModule { }
