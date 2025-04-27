import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AddressesService } from 'src/addresses/addresses.service';

/**
 * Class representing an auth module
 */
@Module({
  imports: [JwtModule.register({ global: true, secret: process.env.JWT_SECRET })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService, AddressesService],
})
export class AuthModule {}
