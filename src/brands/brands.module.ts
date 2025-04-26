import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BrandsController } from './brands.controller';
import { CountriesService } from 'src/countries/countries.service';

/**
 * Class representing a brands module
 */
@Module({
  imports: [],
  controllers: [BrandsController],
  providers: [BrandsService, PrismaService, CountriesService],
})
export class BrandsModule {}
