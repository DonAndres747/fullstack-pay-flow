import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>) { }
}
