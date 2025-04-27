import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { ColorsModule } from './colors/colors.module';
import { PrismaService } from './prisma/prisma.service';
import { VehiclesModule } from './vehicles/vehicles.module';
import { AddressesModule } from './addresses/addresses.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    VehiclesModule,
    BrandsModule,
    AddressesModule,
    CountriesModule,
    ColorsModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
