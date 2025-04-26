import { Prisma } from 'prisma/generated/prisma';
import { CountryModel } from 'src/utils/models/country.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCountryDto } from 'src/utils/dto/countries-dto/create-country.dto';
import { UpdateCountryDto } from 'src/utils/dto/countries-dto/update-country.dto';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * Class representing a countries service
 */
@Injectable()
export class CountriesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Selection object for a country
  public readonly countrySelect: Prisma.CountrySelect = {
    id: true,
    name: true,
    isoCode: true,
    continent: true,
    population: true,
    createdAt: true,
    updatedAt: true,
    addresses: false,
    _count: false,
    brands: false,
  };

  /**
   * Function to get a country by id
   */
  async get(id: string): Promise<CountryModel> {
    const country = await this.prismaService.country.findUnique({
      where: { id },
      select: this.countrySelect,
    });

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }

  /**
   * Function to get all countries
   */
  async getAll(): Promise<CountryModel[]> {
    return await this.prismaService.country.findMany({ select: this.countrySelect });
  }

  /**
   * Function to create a new coutnry
   */
  async create(createCountryDto: CreateCountryDto): Promise<CountryModel> {
    try {
      const newCountry = await this.prismaService.country.create({
        data: createCountryDto,
        select: this.countrySelect,
      });

      return newCountry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Country with that iso code already exists');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the country.',
      );
    }
  }

  /**
   * Function to update a country
   */
  async update(id: string, updateCountryDto: UpdateCountryDto): Promise<CountryModel> {
    try {
      const updatedCountry = await this.prismaService.country.update({
        where: { id },
        data: updateCountryDto,
        select: this.countrySelect,
      });

      return updatedCountry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Country not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Country with that iso code already exists');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the country.',
      );
    }
  }

  /**
   * Function to delete a country
   */
  async delete(id: string): Promise<CountryModel> {
    try {
      const deletedCountry = await this.prismaService.country.delete({
        where: { id },
        select: this.countrySelect,
      });

      return deletedCountry;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Country not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the country.',
      );
    }
  }
}
