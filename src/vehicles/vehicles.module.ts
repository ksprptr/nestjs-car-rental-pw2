import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

/**
 * Class representing a vehicles module
 */
@Module({
  imports: [],
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService],
})
export class VehiclesModule {}
