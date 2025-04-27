import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ColorModel } from 'src/utils/models/color.model';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { ColorsService } from './colors.service';
import { CreateColorDto } from 'src/utils/dto/colors-dto/create-color.dto';
import { UpdateColorDto } from 'src/utils/dto/colors-dto/update-color.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

/**
 * Class representing a colors controller
 */
@ApiTags('Colors')
@ApiBearerAuth()
@UseGuards(AuthGuard, AccessGuard)
@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  /**
   * Controller to get all colors
   */
  @ApiOperation({ summary: 'Get all colors' })
  @ApiOkResponse({ type: [ColorModel], description: 'Colors' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get()
  async getAll(): Promise<ColorModel[]> {
    return this.colorsService.getAll();
  }

  /**
   * Controller to get a color by id
   */
  @ApiOperation({ summary: 'Get a color by id' })
  @ApiOkResponse({ type: ColorModel, description: 'Color' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Color not found' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<ColorModel> {
    return this.colorsService.get(id);
  }

  /**
   * Controller to create a new color
   */
  @ApiOperation({ summary: 'Create a new color' })
  @ApiCreatedResponse({ type: ColorModel, description: 'Created color' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Color with that hex value already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while creating the color',
  })
  @Post()
  async create(@Body() createColorDto: CreateColorDto): Promise<ColorModel> {
    return this.colorsService.create(createColorDto);
  }

  /**
   * Controller to update a color
   */
  @ApiOperation({ summary: 'Update a color' })
  @ApiOkResponse({ type: ColorModel, description: 'Updated color' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Color not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Color with that hex value already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while updating the color',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateColorDto: UpdateColorDto,
  ): Promise<ColorModel> {
    return this.colorsService.update(id, updateColorDto);
  }

  /**
   * Controller to delete a color
   */
  @ApiOperation({ summary: 'Delete a color' })
  @ApiOkResponse({ type: ColorModel, description: 'Deleted color' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Color not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Color cannot be deleted because it is in use',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while deleting the color',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ColorModel> {
    return this.colorsService.delete(id);
  }
}
