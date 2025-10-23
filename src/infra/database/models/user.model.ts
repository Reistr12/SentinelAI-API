import { Column, DataType, Table, Model } from "sequelize-typescript";

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN', // controla o sistema inteiro (nível global)
  COMPANY_ADMIN = 'COMPANY_ADMIN', // administra dispositivos e usuários da empresa
  TECHNICIAN = 'TECHNICIAN', // configura e monitora dispositivos
  ANALYST = 'ANALYST', // analisa métricas e alertas
  USER = 'USER', // visualiza dados próprios
}


@Table({
  tableName: "users",
  timestamps: true,
})
export class UserModel extends Model<UserModel> {
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
