import { Controller, Post, Body, Param, Get, Patch } from '@nestjs/common';

import { TransactionService } from '../services/transaction.service';
import { TransactionStatus } from '../enums/transaction-status.enum';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) { }

    @Post()
    registerTransaction(@Body() body) { 
        return this.transactionService.registerTransaction(body);
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.transactionService.findById(id);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() body: { status: TransactionStatus; transactionId?: string }) {
        return this.transactionService.updateStatus(id, body.status, body.transactionId);
    }
}
