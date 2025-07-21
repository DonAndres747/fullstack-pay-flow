import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) { }

    async findOrCreate(customerData: Partial<Customer>): Promise<Customer> {
        const existing = await this.customerRepository.findOne({
            where: {
                name: customerData.name,
                address: customerData.address,
                phone: customerData.phone
            },
        });

        if (existing) {
            return existing;
        }

        const newCustomer = this.customerRepository.create(customerData);
        return this.customerRepository.save(newCustomer);
    }
}
