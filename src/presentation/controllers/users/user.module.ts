import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/use-cases/users/create-user.usecase";
import { UserRepository } from "src/infra/database/repositories/user.repository";
import { UserModel } from "src/infra/database/models/user.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreateUSerController } from "./create-user.controller";

@Module({
    imports: [SequelizeModule.forFeature([UserModel])],
    controllers: [CreateUSerController],
    providers: [
        CreateUserUseCase,  
        { provide: 'IUserRepository', useClass: UserRepository }
    ],
    exports: ['IUserRepository'],
})
export class UserModule {}