import { Prisma } from 'prisma/generated/prisma';
import { AddressModel } from 'src/utils/models/address.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from 'src/utils/dto/addresses-dto/create-address.dto';
import { UpdateAddressDto } from 'src/utils/dto/addresses-dto/update-address.dto';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';

/**
 * Class representing an addresses service
 */
@Injectable()
export class AddressesService {
  constructor(private readonly prismaService: PrismaService) {}

  // Selection object for address
  public readonly addressSelect: Prisma.AddressSelect = {
    id: true,
    city: true,
    countryId: false,
    country: true,
    zip: true,
    streetName: true,
    streetNumber: true,
    createdAt: true,
    updatedAt: true,
    users: false,
    _count: false,
  };

  /**
   * Function to get an address by id
   */
  async get(id: string): Promise<AddressModel> {
    const address = await this.prismaService.address.findUnique({
      where: { id },
      select: this.addressSelect,
    });

    if (!address) {
      throw new NotFoundException('Address not found');
    }

    return address;
  }

  /**
   * Function to get all addresses
   */
  async getAll(): Promise<AddressModel[]> {
    return await this.prismaService.address.findMany({ select: this.addressSelect });
  }

  /**
   * Function to create a new address
   */
  async create(createAddressDto: CreateAddressDto): Promise<AddressModel> {
    try {
      const newAddress = await this.prismaService.address.create({
        data: createAddressDto,
        select: this.addressSelect,
      });

      return newAddress;
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the address.',
      );
    }
  }

  /**
   * Function to update an address
   */
  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<AddressModel> {
    try {
      const updatedAddress = await this.prismaService.address.update({
        where: { id },
        data: updateAddressDto,
        select: this.addressSelect,
      });

      return updatedAddress;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Address not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the address.',
      );
    }
  }

  /**
   * Function to delete an address
   */
  async delete(id: string): Promise<AddressModel> {
    try {
      const deletedAddress = await this.prismaService.address.delete({
        where: { id },
        select: this.addressSelect,
      });

      return deletedAddress;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Address not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the address.',
      );
    }
  }
}
