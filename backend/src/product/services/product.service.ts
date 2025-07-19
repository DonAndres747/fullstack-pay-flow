import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"

import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    findOne(id: number): Promise<Product | null> {
        return this.productRepository.findOne({ where: { id } });
    }
}