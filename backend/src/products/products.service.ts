// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productModel.create(createProductDto as any);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  // >>>>>>>>>>>>>> CORREÇÃO AQUI <<<<<<<<<<<<<<<<
  async findOne(id: string): Promise<Product | null> { // Pode retornar Product ou null
    return this.productModel.findByPk(+id);
  }
  // >>>>>>>>>>>>>>>>>>>>> FIM <<<<<<<<<<<<<<<<<<<<<<<<<

  // >>>>>>>>>>>>>> CORREÇÃO AQUI <<<<<<<<<<<<<<<<
  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product | null> { // Pode retornar Product ou null
    const [affectedCount] = await this.productModel.update(updateProductDto, {
      where: { id: +id },
      // O 'returning: true' só funciona bem com PostgreSQL para retornar o registro atualizado.
      // Para SQLite/MySQL, você geralmente precisa buscar o registro novamente após o update.
      // returning: true, // Descomente se usar PostgreSQL
    });

    if (affectedCount > 0) {
      // Se houver linhas afetadas, buscamos o produto atualizado.
      return this.productModel.findByPk(+id);
    }
    return null; // Retorna null se nenhum produto foi atualizado
  }
  // >>>>>>>>>>>>>>>>>>>>> FIM <<<<<<<<<<<<<<<<<<<<<<<<<

  // >>>>>>>>>>>>>> CORREÇÃO AQUI (se a assinatura do controller espera void) <<<<<<<<<<<<<<<<
  async remove(id: string): Promise<void> { // Retorna void para coincidir com o controller
    await this.productModel.destroy({
      where: { id: +id },
    });
    // Não retorna nada, pois o Promise<void> indica que a operação é concluída sem valor de retorno.
  }
  // >>>>>>>>>>>>>>>>>>>>> FIM <<<<<<<<<<<<<<<<<<<<<<<<<

  async findByCriteria(criteria: any): Promise<Product[]> {
    return this.productModel.findAll({
      where: criteria,
    });
  }
}