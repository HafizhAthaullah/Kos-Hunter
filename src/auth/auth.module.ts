import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guard/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Global()
  @Module({
    imports: [
    JwtModule.register({
        secret: process.env.SECRET_KEY!,
        signOptions: { expiresIn: '99999999y' },
    }),
  ],
  controllers: [AuthController],
    providers: [
      {provide: APP_GUARD, useClass: RolesGuard},
      AuthService,
      BcryptService,
    ],
})
export class AuthModule {}
