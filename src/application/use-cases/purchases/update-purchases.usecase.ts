import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UpdatePurchasesDto } from 'src/application/dtos/purchases/update-purchases.dto';
import { PurchasesEntity } from 'src/domain/entities/purchases.entity';
import type { IPurchasesRepository } from 'src/domain/interfaces/purchases-interface.repository';
import { PurchaseStatus } from 'src/infra/database/models/purchases.model';

@Injectable()
export class UpdatePurchasesUseCase {
  constructor(
    @Inject('IPurchasesRepository')
    private readonly purchasesRepository: IPurchasesRepository
  ) { }

  async execute(id: string, dto: UpdatePurchasesDto): Promise<PurchasesEntity> {
    const purchase = await this.purchasesRepository.findByPurchaseId(id);

    const payload: Partial<PurchasesEntity> = { ...dto };

    if (dto.status === PurchaseStatus.PAID) {
      payload.paid_at = new Date();
    }

    const updated = await this.purchasesRepository.update(id, payload);

    if (!updated) {
      throw new BadRequestException('Error updating purchase');
    }

    return updated;
  }
}
