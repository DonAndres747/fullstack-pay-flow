import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from '../entities/transaction.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>,
    ) { }

    registerTransaction(data: Partial<Transaction>) {
        const transaction = this.transactionRepo.create(data);

        return this.transactionRepo.save(transaction);
    }

    findById(id: string) {
        return this.transactionRepo.findOne({
            where: { id },
            relations: ['product', 'customer'],
        });
    }

    async updateStatus(id: string, status: TransactionStatus) {
        const transaction = await this.findById(id);
        if (!transaction) return null;

        transaction.status = status;
        if (id) transaction.id = id;

        return this.transactionRepo.save(transaction);
    }
}
