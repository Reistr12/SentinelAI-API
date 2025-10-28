// purchases.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

export interface PurchaseCreationAttrs {
  purchaseId?: string;
  name: string;
  plan: string;
  amount: number;
  payment: string;
  status: string;
  paid_at?: Date | null;
}

@Table({ tableName: 'purchases', timestamps: true, underscored: true })
export class PurchaseModel extends Model<PurchaseModel, PurchaseCreationAttrs> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare purchaseId: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare plan: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare amount: string; // DECIMAL => string no TS

  @Column({ type: DataType.STRING, allowNull: false })
  declare payment: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @Column({ type: DataType.DATE, allowNull: true })
  declare paid_at: Date | null;
}
