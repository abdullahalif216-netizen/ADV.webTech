import { PartialType } from "@nestjs/swagger";
import { CreateProductDto } from "@/modules/product/dto/create-product.dto";

// Every field becomes optional, validation rules are inherited.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
