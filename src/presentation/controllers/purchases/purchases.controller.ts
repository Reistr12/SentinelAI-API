import { Body, Controller, Patch, Post, Param } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatePurchasesDto } from "src/application/dtos/purchases/purchases.dto";
import { UpdatePurchasesDto } from "src/application/dtos/purchases/update-purchases.dto";
import { CreatePurchasesUseCase } from "src/application/use-cases/purchases/create-purchases.usecase";
import { UpdatePurchasesUseCase } from "src/application/use-cases/purchases/update-purchases.usecase";

@ApiTags('Purchases')
@Controller('purchases')
export class CreatePurchasesController {
    constructor(
        private readonly createPurchasesUseCase: CreatePurchasesUseCase,
        private readonly updatePurchasesUseCase: UpdatePurchasesUseCase,
    ) { }

    @ApiOperation({
        summary: 'Create a new purchases'
    })
    @Post()
    async createPurchases(@Body() dto: CreatePurchasesDto) {
        return this.createPurchasesUseCase.execute(dto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() dto: UpdatePurchasesDto) {
        return this.updatePurchasesUseCase.execute(id, dto);
    }

}