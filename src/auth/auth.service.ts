// auth.service.ts
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { IUserRepository } from 'src/domain/interfaces/user-interface.repository';
import { UserEntity } from 'src/domain/entities/user.entity';

@Injectable()
export class AuthService {
   constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<{access_token: string}> {
  if (!email || !password) {
    throw new UnauthorizedException('Email and password are required');
  }
  console.log('Email:', email, 'Password:', password);
  const user = await this.userRepository.findByEmail(email);
  console.log('User found:', user);
  if (!user) throw new UnauthorizedException('Email ou senha inválidos');

  console.log('User password:', user.password);
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new UnauthorizedException('Email ou senha inválidos');

  return this.login(user);
}


  async login(user: UserEntity) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role, 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}