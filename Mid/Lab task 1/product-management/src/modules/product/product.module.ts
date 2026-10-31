import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "@/modules/product/entities/product.entity";
import { ProductService } from "@/modules/product/product.service";
import { ProductController } from "@/modules/product/product.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
