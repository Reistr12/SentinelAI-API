import { IsEnum, IsOptional, IsString, IsNumberString } from 'class-validator';
import { PurchaseStatus } from 'src/infra/database/models/purchases.model';

export class UpdatePurchasesDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  plan?: string;

  @IsOptional()
  @IsNumberString()
  amount?: string;

  @IsOptional()
  @IsString()
  payment?: string;

  @IsOptional()
  @IsEnum(PurchaseStatus)
  status?: PurchaseStatus;

  @IsOptional()
  paid_at?: Date | null;
}
