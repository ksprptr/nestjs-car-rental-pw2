import { Prisma } from 'prisma/generated/prisma';
import { AddressModel } from 'src/utils/models/address.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from 'src/utils/dto/addresses-dto/create-address.dto';
import { UpdateAddressDto } from 'src/utils/dto/addresses-dto/update-address.dto';
import { addressSelect as select } from 'src/utils/selections/address.selection';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

/**
 * Class representing an addresses service
 */
@Injectable()
export class AddressesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Function to get all addresses
   */
  async getAll(): Promise<AddressModel[]> {
    return await this.prismaService.address.findMany({ select });
  }

  /**
   * Function to get an address by id
   */
  async get(id: string): Promise<AddressModel> {
    const address = await this.prismaService.address.findUnique({ where: { id }, select });

    if (!address) throw new NotFoundException('Address not found');

    return address;
  }

  /**
   * Function to create a new address
   */
  async create(createAddressDto: CreateAddressDto): Promise<AddressModel> {
    const countryExists = await this.prismaService.country.findUnique({
      where: { id: createAddressDto.countryId },
      select: { id: true },
    });

    if (!countryExists) throw new NotFoundException('Country not found');

    try {
      return await this.prismaService.address.create({ data: createAddressDto, select });
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the address',
      );
    }
  }

  /**
   * Function to update an address
   */
  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<AddressModel> {
    if (updateAddressDto.countryId) {
      const countryExists = await this.prismaService.country.findUnique({
        where: { id: updateAddressDto.countryId },
        select: { id: true },
      });

      if (!countryExists) throw new NotFoundException('Country not found');
    }

    try {
      return await this.prismaService.address.update({
        where: { id },
        data: updateAddressDto,
        select,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Address not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the address',
      );
    }
  }

  /**
   * Function to delete an address
   */
  async delete(id: string): Promise<AddressModel> {
    try {
      return await this.prismaService.address.delete({ where: { id }, select });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Address not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the address',
      );
    }
  }
}
