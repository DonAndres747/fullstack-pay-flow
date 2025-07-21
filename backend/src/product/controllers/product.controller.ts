import { Body, Controller, Get, Param, ParseIntPipe, Patch } from "@nestjs/common";

import { ProductService } from "../services/product.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    find(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Patch(':id/qty')
    updateQty(@Param('id') id: number, @Body() body) {
        return this.productService.updateStock(id, body.reqQty);
    }
}