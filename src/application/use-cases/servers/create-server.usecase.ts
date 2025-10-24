import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreateServerDto } from 'src/application/dtos/servers/create-server.dto';
import { ServerEntity } from 'src/domain/entities/server.entity';
import type { IServerRepository } from 'src/domain/interfaces/server-interface.repository';

@Injectable()
export class CreateServerUseCase {
  constructor(
    @Inject('IServerRepository')
    private readonly serverRepository: IServerRepository
  ) {}

  async execute(dto: CreateServerDto) {
    const { ip, name } = dto;

    if( !ip || !name ) {
      throw new BadRequestException('Some fields are missing. Please check and try again.');
    }
    
    // Verifica se servidor já existe
    const ipAlreadyExists = await this.serverRepository.findByIp(ip);

    if (ipAlreadyExists) {
      throw new BadRequestException('There is already a server registered with this IP address.');
    }

    const newServer = new ServerEntity(
      {
        name,
        ip
      },
      randomUUID(),
    );

    const createdServer = await this.serverRepository.create(newServer);

    if(createdServer === null) {
      throw new BadRequestException('Error creating server');
    }
    return createdServer;
  }
}
