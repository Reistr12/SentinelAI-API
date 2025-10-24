import { Module } from "@nestjs/common";
import { CreateServerUseCase } from "src/application/use-cases/servers/create-server.usecase";
import { ServerRepository } from "src/infra/database/repositories/server.repository";
import { ServerModel } from "src/infra/database/models/create-server.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreateServerController } from "./create-server.controller";

@Module({
    imports: [SequelizeModule.forFeature([ServerModel])],
    controllers: [CreateServerController],
    providers: [
        CreateServerUseCase,  
        { provide: 'IServerRepository', useClass: ServerRepository }
    ],
    exports: ['IServerRepository'],
})
export class ServerModule {}