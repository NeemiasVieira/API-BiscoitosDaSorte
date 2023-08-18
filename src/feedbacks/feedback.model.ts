import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Feedbacks extends Model{
    @Column({allowNull: false})
    nota: number
    @Column({allowNull: false})
    mensagem: string;

}