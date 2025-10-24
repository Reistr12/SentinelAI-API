import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'servers', timestamps: true })
export class ServerModel extends Model<ServerModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare ip: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
}
