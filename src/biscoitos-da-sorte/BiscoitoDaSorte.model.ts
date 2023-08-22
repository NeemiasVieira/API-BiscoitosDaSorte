import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table
export class BiscoitosDaSorte extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mensagem: string;
}