import ctx from 'src/ctx';
import { Prisma } from 'prisma/generated/prisma';
import { BrandModel } from 'src/utils/models/brand.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBrandDto } from 'src/utils/dto/brands-dto/create-brand.dto';
import { UpdateBrandDto } from 'src/utils/dto/brands-dto/update-brand.dto';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * Class representing a brands service
 */
@Injectable()
export class BrandsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Function to get all brands
   */
  async getAll(): Promise<BrandModel[]> {
    return await this.prismaService.brand.findMany({ select: ctx.selections.brand.brandSelect });
  }

  /**
   * Function to get a brand by id
   */
  async get(id: string): Promise<BrandModel> {
    const brand = await this.prismaService.brand.findUnique({
      where: { id },
      select: ctx.selections.brand.brandSelect,
    });

    if (!brand) throw new NotFoundException('Brand not found');

    return brand;
  }

  /**
   * Function to create a new brand
   */
  async create(createBrandDto: CreateBrandDto): Promise<BrandModel> {
    const country = await this.prismaService.country.findUnique({
      where: { id: createBrandDto.countryId },
    });

    if (!country) throw new NotFoundException('Country not found');

    try {
      const newBrand = await this.prismaService.brand.create({
        data: createBrandDto,
        select: ctx.selections.brand.brandSelect,
      });

      return newBrand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Brand with that name already exists');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the brand.',
      );
    }
  }

  /**
   * Function to update a brand
   */
  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<BrandModel> {
    if (updateBrandDto.countryId) {
      const country = await this.prismaService.country.findUnique({
        where: { id: updateBrandDto.countryId },
      });

      if (!country) throw new NotFoundException('Country not found');
    }

    try {
      const updatedBrand = await this.prismaService.brand.update({
        where: { id },
        data: updateBrandDto,
        select: ctx.selections.brand.brandSelect,
      });

      return updatedBrand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Brand not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Brand with that name already exists');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the brand.',
      );
    }
  }

  /**
   * Function to delete a brand
   */
  async delete(id: string): Promise<BrandModel> {
    try {
      const deletedBrand = await this.prismaService.brand.delete({
        where: { id },
        select: ctx.selections.brand.brandSelect,
      });

      return deletedBrand;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Brand not found');
        }

        if (error.code === 'P2003') {
          throw new ConflictException('Brand cannot be deleted because it is in use');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the brand.',
      );
    }
  }
}
