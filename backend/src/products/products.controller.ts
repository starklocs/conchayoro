// src/products/products.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.model'; // ✅ caminho único e consistente


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get() // Rota para findAll()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // >>>>>>>>>>>>>> CORREÇÃO AQUI <<<<<<<<<<<<<<<<
  @Get(':id') // Rota para findOne()
  findOne(@Param('id') id: string): Promise<Product | null> { // Pode retornar Product ou null
    return this.productsService.findOne(id);
  }
  // >>>>>>>>>>>>>>>>>>>>> FIM <<<<<<<<<<<<<<<<<<<<<<<<<

  // >>>>>>>>>>>>>> CORREÇÃO AQUI <<<<<<<<<<<<<<<<
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> { // Pode retornar Product ou null
    return this.productsService.update(id, updateProductDto);
  }
  // >>>>>>>>>>>>>>>>>>>>> FIM <<<<<<<<<<<<<<<<<<<<<<<<<

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }

  @Get('criteria') // Rota para findByCriteria()
  findByCriteria(@Body() criteria: any): Promise<Product[]> {
    return this.productsService.findByCriteria(criteria);
  }
}