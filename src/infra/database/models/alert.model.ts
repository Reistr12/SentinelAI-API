// models/alert.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DeviceModel } from './device.model';

export enum AlertStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
}

@Table({ tableName: 'alerts', timestamps: true })
export class AlertModel extends Model<AlertModel> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => DeviceModel)
  @Column({ type: DataType.UUID, allowNull: false })
  declare deviceId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare type: string; // CPU, MEMORY, TEMPERATURE

  @Column({ type: DataType.TEXT, allowNull: false })
  declare message: string;

  @Column({ type: DataType.ENUM('PENDING', 'SENT', 'ACKNOWLEDGED'), defaultValue: AlertStatus.PENDING })
  declare status: AlertStatus;

  @BelongsTo(() => DeviceModel)
  declare device: DeviceModel;
}
