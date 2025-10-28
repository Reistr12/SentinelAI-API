import { Model } from "sequelize-typescript";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { AlertSettingModel } from "./alert-setting.model";
import { AlertModel } from "./alert.model";
import { ServerModel } from "./create-server.model";

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

    // Foreign key to ServerModel (optional)
    @ForeignKey(() => ServerModel)
    @Column({
        type: DataType.UUID,
        allowNull: true,
    })
    declare serverId: string | null

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

    @BelongsTo(() => ServerModel)
    declare server: ServerModel;

    @HasMany(() => AlertModel)
    declare alerts: AlertModel[];

    @HasMany(() => AlertSettingModel)
    declare alertSettings: AlertSettingModel[];

}
