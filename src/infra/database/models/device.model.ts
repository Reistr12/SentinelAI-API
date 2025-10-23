import { Model } from "sequelize-typescript";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { AlertSetting } from "./alert-setting.model";
import { Alert } from "./alert.model";
import { Metric } from "./metric.model";

@Table({
    tableName: "devices",
    timestamps: true,
})
export class Device extends Model<Device> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    declare id: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare apiKey: string

    @Column({ type: DataType.TEXT })
    declare description: string;

    @BelongsTo(() => User)
    declare user: User;

    @HasMany(() => Metric)
    declare metrics: Metric[];

    @HasMany(() => Alert)
    declare alerts: Alert[];

    @HasMany(() => AlertSetting)
    declare alertSettings: AlertSetting[];

}