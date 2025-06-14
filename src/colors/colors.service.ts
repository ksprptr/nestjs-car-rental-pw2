import { Prisma } from 'prisma/generated/prisma';
import { ColorModel } from 'src/utils/models/color.model';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from 'src/utils/dto/colors-dto/create-color.dto';
import { UpdateColorDto } from 'src/utils/dto/colors-dto/update-color.dto';
import { colorSelect as select } from 'src/utils/selections/color.selection';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

/**
 * Class representing a colors service
 */
@Injectable()
export class ColorsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Function to get all colors
   */
  async getAll(): Promise<ColorModel[]> {
    return await this.prismaService.color.findMany({ select });
  }

  /**
   * Function to get a color by id
   */
  async get(id: string): Promise<ColorModel> {
    const color = await this.prismaService.color.findUnique({ where: { id }, select });

    if (!color) throw new NotFoundException('Color not found');

    return color;
  }

  /**
   * Function to create a new color
   */
  async create(createColorDto: CreateColorDto): Promise<ColorModel> {
    try {
      return await this.prismaService.color.create({ data: createColorDto, select });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Color with that hex value already exists');
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while creating the color',
      );
    }
  }

  /**
   * Function to update a color
   */
  async update(id: string, updateColorDto: UpdateColorDto): Promise<ColorModel> {
    try {
      return await this.prismaService.color.update({ where: { id }, data: updateColorDto, select });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Color not found');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Color with that hex value already exists');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while updating the color',
      );
    }
  }

  /**
   * Function to delete a color
   */
  async delete(id: string): Promise<ColorModel> {
    try {
      return await this.prismaService.color.delete({ where: { id }, select });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Color not found');
        }

        if (error.code === 'P2003') {
          throw new ConflictException('Color cannot be deleted because it is in use');
        }
      }

      throw new InternalServerErrorException(
        'An unexpected error occurred while deleting the color',
      );
    }
  }
}
