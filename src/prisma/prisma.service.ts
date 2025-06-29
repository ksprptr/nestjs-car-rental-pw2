import { PrismaClient } from 'prisma/generated/prisma';
import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * Class representing a prisma service
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
