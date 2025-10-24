import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateServerDto } from "src/application/dtos/servers/create-server.dto";
import { CreateServerUseCase } from "src/application/use-cases/servers/create-server.usecase";

@ApiTags('Servers')
@Controller('servers')
export class CreateServerController {
    constructor(
        private readonly createServerUseCase: CreateServerUseCase,
    ) {}
    
    @ApiOperation({ 
        summary: 'Create a new server' 
    })
    @Post()
    async createServer(@Body() dto:CreateServerDto) {
        return this.createServerUseCase.execute(dto);
    }
}