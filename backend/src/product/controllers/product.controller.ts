import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";

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
}