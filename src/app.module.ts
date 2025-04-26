import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { ColorsModule } from './colors/colors.module';
import { PrismaService } from './prisma/prisma.service';
import { AddressesModule } from './addresses/addresses.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [AuthModule, AddressesModule, CountriesModule, ColorsModule, BrandsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
