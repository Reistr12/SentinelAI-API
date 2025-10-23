import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { UserEntity } from 'src/domain/entities/user.entity';
import type { IUserRepository } from 'src/domain/interfaces/user-interface.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: CreateUserDto) {
    const { name, email, password, role } = dto;

    if(!name || !email || !password || !role) {
      throw new BadRequestException('Some fields are missing. Please check and try again.');
    }
    
    // Verifica se usuário já existe
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException('User with this email already exists');
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria a entidade de usuário
    const newUser = new UserEntity(
      {
        name,
        email,
        password: hashedPassword,
        role,
      },
      randomUUID(),
    );

    const createdUser = await this.userRepository.create(newUser);

    if(createdUser === null) {
      throw new BadRequestException('Error creating user');
    }
    return createdUser;
  }
}
