import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { create } from 'axios';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreatePurchasesDto } from 'src/application/dtos/purchases/purchases.dto';
import { PurchasesEntity } from 'src/domain/entities/purchases.entity';
import type { IPurchasesRepository } from 'src/domain/interfaces/purchases-interface.repository';

@Injectable()
export class CreatePurchasesUseCase {
  constructor(
    @Inject('IPurchasesRepository')
    private readonly purchasesRepository: IPurchasesRepository
  ) {}

  async execute(dto: CreatePurchasesDto) {
    const { id, name, plan, amount, status, payment, paid_at  } = dto;

    const idAlreadyExists = await this.purchasesRepository.findByPurchaseId(id);

    if (idAlreadyExists) {
      throw new BadRequestException('There is already a server registered with this IP address.');
    }

    const newPurchases = new PurchasesEntity(
      {
        name,
        plan,
        amount,
        status,
        payment,
        paid_at
      },
      randomUUID(),
    );

    const createdPurchases = await this.purchasesRepository.create(newPurchases);

    if(createdPurchases === null) {
      throw new BadRequestException('Error creating purchases');
    }
    return createdPurchases;
  }
}
