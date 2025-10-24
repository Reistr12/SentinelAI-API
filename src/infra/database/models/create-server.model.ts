import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { DeviceModel } from './device.model';

@Table({ tableName: 'servers', timestamps: true })
export class ServerModel extends Model<ServerModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({ 
    type: DataType.STRING(45), 
    allowNull: false, 
    unique: true 
  })
  declare ip: string;

  @Column({ 
    type: DataType.STRING(45), 
    allowNull: false 
  })
  declare name: string;

  @Column({ 
    type: DataType.STRING(45), 
    allowNull: true,
    defaultValue: ''
  })
  declare devices: string;

  @HasMany(() => DeviceModel)
  devicesList: DeviceModel[];
}
