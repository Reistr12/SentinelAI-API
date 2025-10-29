// purchases.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}
export interface PurchaseCreationAttrs {
  name: string;
  plan: string;
  amount: string;   
  payment: string;
  status?: PurchaseStatus; 
  paid_at?: Date | null;
}

@Table({ tableName: 'purchases', timestamps: true, underscored: true })
export class PurchaseModel extends Model<PurchaseModel, PurchaseCreationAttrs> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare plan: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare amount: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare payment: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'PENDING',
  })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare paid_at: Date | null;
}
