import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Product } from '../../product/entities/product.entity';
import { Customer } from '../../customer/entities/customer.entity';
import { TransactionStatus } from '../enums/transaction-status.enum';

@Entity('transaction')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({
        type: 'enum',
        enum: TransactionStatus,
        default: TransactionStatus.PENDING,
    })
    status: TransactionStatus;

    @Column({ name: 'transaction_id', nullable: true })
    transactionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Product, (product) => product.transaction)
    product: Product;

    @ManyToOne(() => Customer, (customer) => customer.transaction, { nullable: true })
    customer: Customer;
}
