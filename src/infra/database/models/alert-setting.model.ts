// models/alert-setting.model.ts
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Device } from './device.model';

@Table({ tableName: 'alert_settings', timestamps: true })
export class AlertSetting extends Model<AlertSetting> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => Device)
  @Column({ type: DataType.UUID, allowNull: false })
  declare deviceId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare metricType: string; // cpu_usage, memory, temperature

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare threshold: number;

  @Column({ type: DataType.ENUM('>', '<'), defaultValue: '>' })
  declare comparison: string;

  @BelongsTo(() => Device)
  declare device: Device;
}
