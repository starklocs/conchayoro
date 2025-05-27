import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  declare name: string;
  declare price: number;
  declare category: string;
  declare rating: number;
}