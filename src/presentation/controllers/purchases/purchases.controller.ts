import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePurchasesDto } from "src/application/dtos/purchases/purchases.dto";
import { CreatePurchasesUseCase } from "src/application/use-cases/purchases/purchases.usecase";

@ApiTags('Purchases')
@Controller('purchases')
export class CreatePurchasesController {
    constructor(
        private readonly createPurchasesUseCase: CreatePurchasesUseCase,
    ) {}
    
    @ApiOperation({ 
        summary: 'Create a new purchases' 
    })
    @Post()
    async createPurchases(@Body() dto:CreatePurchasesDto) {
        return this.createPurchasesUseCase.execute(dto);
    }
}