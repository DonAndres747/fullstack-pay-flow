import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @OneToMany(() => Transaction, (transaction) => transaction.customer)
    transaction: Transaction[];
}
