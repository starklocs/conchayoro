// src/products/product.model.ts

import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
} from 'sequelize-typescript';

@Table({
  tableName: 'products', // Nome da tabela no banco de dados
  timestamps: true,      // Adiciona os campos createdAt e updatedAt automaticamente
})
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: number; 

  @AllowNull(false)
  @Column(DataType.STRING) 
  name: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  price: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  category: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  rating: number;
}