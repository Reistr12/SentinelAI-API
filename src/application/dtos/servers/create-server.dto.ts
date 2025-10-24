import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateServerDto {
  @ApiProperty({ example: '192.168.1.10', description: 'Server IP address' })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({ example: 'Main Server', description: 'Server identification name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'DESKTOP-XXXXXXXX', description: 'Devices of server' })
  @IsString()
  @IsOptional()
  devices: string;
}
