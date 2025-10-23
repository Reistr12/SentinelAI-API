import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Device } from './device.model';

@Table({ tableName: 'metrics', timestamps: false })
export class Metric extends Model<Metric> {
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
  declare type: string; // ex: cpu_usage, memory, temperature

  @Column({ type: DataType.FLOAT, allowNull: false })
  declare value: number;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  declare timestamp: Date;

  @BelongsTo(() => Device)
  declare device: Device;
}
