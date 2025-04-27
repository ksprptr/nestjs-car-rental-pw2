import { Module } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ColorsController } from './colors.controller';

/**
 * Class representing a colors module
 */
@Module({
  imports: [],
  controllers: [ColorsController],
  providers: [ColorsService, PrismaService],
})
export class ColorsModule {}
