import { Injectable } from "@nestjs/common";
import { PurchasesEntity } from "src/domain/entities/purchases.entity";
import { IPurchasesRepository } from "src/domain/interfaces/purchases-interface.repository";
import { PurchaseModel } from "../models/purchases.model";
import { InjectModel } from "@nestjs/sequelize";
import { randomUUID } from "crypto";

@Injectable()
export class PurchasesRepository implements IPurchasesRepository{
    constructor(
        @InjectModel(PurchaseModel) private readonly purchaseModel: typeof PurchaseModel,
    ) {}
    existsById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async create(data: PurchasesEntity): Promise<PurchasesEntity | null> {
        const createdPurchases = await this.purchaseModel.create({
            id: data.id ?? randomUUID(),
            name: data.name,
            plan: data.plan,
            amount: data.amount,
            payment: data.payment,
            status: data.status ?? 'PENDING',
            paid_at: data.paid_at,
        } as any);
        
        return createdPurchases
    }

    async findAll (
        filter?: { name?: string }
    ): Promise<PurchasesEntity[]> {
        return [];
    }

    async findByPurchaseId(id: string): Promise<PurchasesEntity | null> {
        return null;
    }

    async update(id: string, data: Partial<PurchasesEntity>): Promise<PurchasesEntity | null> {
    const purchase = await this.purchaseModel.findByPk(id);
    if (!purchase) return null;

    await purchase.update(data);
    return purchase as unknown as PurchasesEntity;
    }

    async delete(id: string): Promise<void> {
        return;
    }
}
