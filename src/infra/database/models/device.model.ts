import { Model } from "sequelize-typescript";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { AlertSettingModel } from "./alert-setting.model";
import { AlertModel } from "./alert.model";
import { MetricModel } from "./metric.model";

@Table({
    tableName: "devices",
    timestamps: true,
})
export class DeviceModel extends Model<DeviceModel> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    declare id: string

    @ForeignKey(() => UserModel)
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

    @BelongsTo(() => UserModel)
    declare user: UserModel;

    @HasMany(() => MetricModel)
    declare metrics: MetricModel[];

    @HasMany(() => AlertModel)
    declare alerts: AlertModel[];

    @HasMany(() => AlertSettingModel)
    declare alertSettings: AlertSettingModel[];

}