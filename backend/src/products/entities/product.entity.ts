// src/products/entities/product.entity.ts
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
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model<Product> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare id: number; // Adicionado 'declare' para o aviso TS(2612), opcional

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

  // Nenhuma importação de outros arquivos do módulo 'products' aqui!
}