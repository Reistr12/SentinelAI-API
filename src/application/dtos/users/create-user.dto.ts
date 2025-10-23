import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/infra/database/models/user.model";

export class CreateUserDto {
    @ApiProperty({
        example: 'John Doe',
        description: 'The name of the user',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        example: 'email@example.com',
        description: 'The email of the user',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        example: 'strongPassword123',
        description: 'The password of the user',
    })
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;

    @ApiProperty({
        enum: Role,
        example: Role.USER,
        description: 'The role of the user',
        default: Role.USER,
    })
    @IsEnum(Role)
    @IsOptional()
    role: Role
}