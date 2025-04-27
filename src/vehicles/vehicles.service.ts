import ctx from 'src/ctx';
import { Prisma } from 'prisma/generated/prisma';
import { VehicleModel } from 'src/utils/models/vehicle.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from 'src/utils/dto/vehicles-dto/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/utils/dto/vehicles-dto/update-vehicle.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

/**
 * CLass representing a vehicles service
 */
@Injectable()
export class VehiclesService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Function to create a new vehicle
   */
  async create(userId: string, createVehicleDto: CreateVehicleDto): Promise<VehicleModel> {
    const brand = await this.prismaService.brand.findUnique({
      where: { id: createVehicleDto.brandId },
    });

    if (!brand) throw new NotFoundException('Brand not found');

    const color = await this.prismaService.color.findUnique({
      where: { id: createVehicleDto.colorId },
    });

    if (!color) throw new NotFoundException('Color not found');

    try {
      const vehicle = await this.prismaService.vehicle.create({
        data: {
          ownerId: userId,
          model: createVehicleDto.model,
          priceUsd: createVehicleDto.priceUsd,
          brandId: createVehicleDto.brandId,
          colorId: createVehicleDto.colorId,
        },
        select: ctx.selections.vehicle.vehicleSelect,
      });

      await this.prismaService.vehicleAttributes.create({
        data: { ...createVehicleDto.attributes, vehicleId: vehicle.id },
      });

      return vehicle;
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the vehicle.',
      );
    }
  }

  /**
   * Function to update a vehicle
   */
  async update(
    userId: string,
    vehicleId: string,
    updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleModel> {
    if (updateVehicleDto.brandId) {
      const brand = await this.prismaService.brand.findUnique({
        where: { id: updateVehicleDto.brandId },
      });

      if (!brand) throw new NotFoundException('Brand not found');
    }

    if (updateVehicleDto.colorId) {
      const color = await this.prismaService.color.findUnique({
        where: { id: updateVehicleDto.colorId },
      });

      if (!color) throw new NotFoundException('Color not found');
    }

    const attributes = await this.prismaService.vehicleAttributes.findUnique({
      where: { vehicleId },
    });

    if (!attributes) throw new NotFoundException('Vehicle attributes not found');

    try {
      if (updateVehicleDto.attributes) {
        await this.prismaService.vehicleAttributes.update({
          where: { id: attributes.id },
          data: updateVehicleDto.attributes,
        });
      }

      const vehicle = await this.prismaService.vehicle.update({
        where: { id: vehicleId, ownerId: userId },
        data: {
          model: updateVehicleDto.model,
          priceUsd: updateVehicleDto.priceUsd,
          brandId: updateVehicleDto.brandId,
          colorId: updateVehicleDto.colorId,
        },
        select: ctx.selections.vehicle.vehicleSelect,
      });

      return vehicle;
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the vehicle.',
      );
    }
  }

  /**
   * Function to delete a vehicle
   */
  async delete(userId: string, vehicleId: string): Promise<VehicleModel> {
    try {
      const attributes = await this.prismaService.vehicleAttributes.findUnique({
        where: { vehicleId },
      });

      if (attributes) {
        await this.prismaService.vehicleAttributes.delete({ where: { id: attributes.id } });
      }

      const vehicle = await this.prismaService.vehicle.delete({
        where: { id: vehicleId, ownerId: userId },
        select: ctx.selections.vehicle.vehicleSelect,
      });

      return vehicle;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Vehicle not found');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the vehicle.',
      );
    }
  }

  /**
   * Function to get currently logged in user's favourite vehicles
   */
  async getFavouriteVehicles(userId: string): Promise<VehicleModel[]> {
    const vehicles = await this.prismaService.userFavouriteVehicle.findMany({
      where: { userId },
      include: { vehicle: { select: ctx.selections.vehicle.vehicleSelect } },
    });

    return vehicles.map((vehicle) => vehicle.vehicle);
  }

  /**
   * Function to add a vehicle to a user's favourites
   */
  async addToFavourites(userId: string, vehicleId: string): Promise<BasicStatusResponse> {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const favourite = await this.prismaService.userFavouriteVehicle.findUnique({
      where: { userId_vehicleId: { userId, vehicleId } },
    });

    if (favourite) throw new ConflictException('Vehicle already in favourites');

    try {
      await this.prismaService.userFavouriteVehicle.create({ data: { userId, vehicleId } });

      return { status: 200, message: 'Vehicle added to favourites successfully.' };
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while adding the vehicle to favourites.',
      );
    }
  }

  /**
   * Function to remove a vehicle from a user's favourites
   */
  async removeFromFavourites(userId: string, vehicleId: string): Promise<BasicStatusResponse> {
    const vehicle = await this.prismaService.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) throw new NotFoundException('Vehicle not found');

    const favourite = await this.prismaService.userFavouriteVehicle.findUnique({
      where: { userId_vehicleId: { userId, vehicleId } },
    });

    if (!favourite) throw new NotFoundException('Vehicle not found in favourites');

    try {
      await this.prismaService.userFavouriteVehicle.delete({
        where: { userId_vehicleId: { userId, vehicleId } },
      });

      return { status: 200, message: 'Vehicle removed from favourites successfully.' };
    } catch {
      throw new InternalServerErrorException(
        'An unexpected error occurred while removing the vehicle from favourites.',
      );
    }
  }
}
