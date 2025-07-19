import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Product } from "./entities/product.entity";
import { ProductService } from "./services/product.service";
import { ProductController } from "./controllers/product.controller";
import { TransactionModule } from "../transactions/transaction.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        forwardRef(() => TransactionModule),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule { }