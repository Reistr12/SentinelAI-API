import { Module } from "@nestjs/common";
import { CreatePurchasesUseCase } from "src/application/use-cases/purchases/create-purchases.usecase";
import { UpdatePurchasesUseCase } from "src/application/use-cases/purchases/update-purchases.usecase";
import { PurchasesRepository } from "../../../infra/database/repositories/purchases.repository";
import { PurchaseModel } from "src/infra/database/models/purchases.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { CreatePurchasesController } from "./purchases.controller";

@Module({
    imports: [SequelizeModule.forFeature([PurchaseModel])],
    controllers: [CreatePurchasesController],
    providers: [
        CreatePurchasesUseCase,  
        UpdatePurchasesUseCase,
        { provide: 'IPurchasesRepository', useClass: PurchasesRepository }
    ],
    exports: ['IPurchasesRepository'],
})
export class PurchasesModule {}