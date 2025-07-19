import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Transaction } from "../../transactions/entities/transaction.entity";

@Entity('product')
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int', { default: 0 })
    stock: number;

    @OneToMany(() => Transaction, (transaction) => transaction.product)
    transaction: Transaction[];
}