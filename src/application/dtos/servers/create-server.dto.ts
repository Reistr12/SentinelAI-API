import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateServerDto {
  @ApiProperty({ example: '192.168.1.10', description: 'Server IP address' })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({ example: 'Main Server', description: 'Server identification name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
