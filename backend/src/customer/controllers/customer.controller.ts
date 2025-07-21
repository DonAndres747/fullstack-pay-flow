import { Body, Controller, Param, Post } from '@nestjs/common';

import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post()
    createNonExisting(@Body() body) { 
        return this.customerService.findOrCreate(body);
    }
}
