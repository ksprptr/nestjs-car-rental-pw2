import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';

/**
 * Class representing an addresses module
 */
@Module({
  imports: [],
  controllers: [AddressesController],
  providers: [AddressesService, PrismaService],
})
export class AddressesModule {}
