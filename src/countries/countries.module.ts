import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';

/**
 * Class representing a countries module
 */
@Module({
  imports: [],
  controllers: [CountriesController],
  providers: [CountriesService, PrismaService],
})
export class CountriesModule {}
