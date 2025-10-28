import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ServerModel } from './create-server.model';

@Table({ tableName: 'metrics' })
export class MetricModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ForeignKey(() => ServerModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  serverId: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  data: object;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp: Date;
}