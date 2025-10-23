import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/presentation/controllers/users/user.module';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default',
      signOptions: { expiresIn: '1d' },
    }),
   UserModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}