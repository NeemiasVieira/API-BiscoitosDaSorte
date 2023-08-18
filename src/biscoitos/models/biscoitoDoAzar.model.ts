import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table

export class BiscoitosDoAzar extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    biscoitosDoAzar: string;
}
