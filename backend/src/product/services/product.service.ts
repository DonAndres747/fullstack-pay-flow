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

    async updateStock(id: number, reqQty: number): Promise<Partial<Product> | null> {
        try {
            const product = await this.findOne(id);
            if (!product) return null; 

            let newStock = product.stock;

            if (product?.id == id) {
                newStock = product.stock - reqQty;
                product.stock = newStock;
            }

            this.productRepository.save(product);
            const data: Partial<Product> = {
                id: product.id,
                stock: newStock
            };

            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}