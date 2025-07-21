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

    registerTransaction(data: Partial<Transaction>): Promise<Transaction | null> {
        const transaction = this.transactionRepo.create(data);

        return this.transactionRepo.save(transaction);
    }

    findById(id: string): Promise<Transaction | null> {
        return this.transactionRepo.findOne({
            where: { id },
            relations: ['product', 'customer'],
        });
    }

    async updateStatus(id: string, status: TransactionStatus): Promise<Partial<Transaction> | null> {
        const transaction = await this.findById(id); 
        if (!transaction) return null;

        transaction.status = status;
        if (id) transaction.id = id;

        this.transactionRepo.save(transaction);
        const data: Partial<Transaction> = { id: transaction.id, status: transaction.status,  updatedAt: new Date()}

        return data;
    }
}
