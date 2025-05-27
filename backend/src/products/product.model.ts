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
  declare name: string; // <--- Use declare aqui

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number; // <--- Use declare aqui

  @AllowNull(true)
  @Column(DataType.STRING)
  declare category: string | null; // <--- Use declare aqui (e null se preferir a undefined)

  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare rating: number | null; // <--- Use declare aqui (e null se preferir a undefined)
}