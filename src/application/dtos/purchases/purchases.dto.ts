import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDate, IsEmpty } from "class-validator";

export class CreatePurchasesDto {

  @ApiProperty({ example: '1', description: 'ID of Purchases' })
  @IsEmpty()
  id: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Avanced', description: 'Plans Names' })
  @IsString()
  @IsNotEmpty()
  plan: string;

  @ApiProperty({ example: '12,90', description: 'Value' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: 'Credit', description: 'Payment Form' })
  @IsString()
  @IsNotEmpty()
  payment: string;

  @ApiProperty({ example: 'Pending', description: 'Status of payment' })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({ example: '26/10/2025', description: 'Date of payment' })
  @IsDate()
  @IsOptional()
  paid_at: Date;

  @ApiProperty({ example: '26/10/2025', description: 'Date of reimbursement' })
  @IsDate()
  @IsOptional()
  refunded_at: Date;
}
