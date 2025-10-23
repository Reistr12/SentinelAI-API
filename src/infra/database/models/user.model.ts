import { Column, DataType, Table, Model } from "sequelize-typescript";

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    declare id: string

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
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string

    @Column({
        type: DataType.ENUM('USER', 'ADMIN'), 
        defaultValue: Role.USER 
    })
    declare role: Role
}
