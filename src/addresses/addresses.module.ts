import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressesService } from './addresses.service';
import { CountriesService } from 'src/countries/countries.service';
import { AddressesController } from './addresses.controller';

/**
 * Class representing a addresses module
 */
@Module({
  imports: [],
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService, CountriesService],
})
export class AddressesModule {}
