import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { AddressesService } from 'src/addresses/addresses.service';
import { CountriesService } from 'src/countries/countries.service';

/**
 * Class representing a users module
 */
@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, AddressesService, CountriesService],
})
export class UsersModule {}
