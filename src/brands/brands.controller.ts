import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BrandModel } from 'src/utils/models/brand.model';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from 'src/utils/dto/brands-dto/create-brand.dto';
import { UpdateBrandDto } from 'src/utils/dto/brands-dto/update-brand.dto';
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
 * Class representing a brands controller
 */
@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  /**
   * Controller to get all brands
   */
  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse({ type: [BrandModel], description: 'Brands' })
  @Get()
  async getAll(): Promise<BrandModel[]> {
    return this.brandsService.getAll();
  }

  /**
   * Controller to get a brand by id
   */
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiOkResponse({ type: BrandModel, description: 'Brand' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Brand not found' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<BrandModel> {
    return this.brandsService.get(id);
  }

  /**
   * Controller to create a new brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiCreatedResponse({ type: BrandModel, description: 'Created brand' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Country not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Brand with that name already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while creating the brand',
  })
  @UseGuards(AuthGuard, AccessGuard)
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandModel> {
    return this.brandsService.create(createBrandDto);
  }

  /**
   * Controller to update a brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a brand' })
  @ApiOkResponse({ type: BrandModel, description: 'Updated brand' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Brand or country not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Brand with that name already exists',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while updating the brand',
  })
  @UseGuards(AuthGuard, AccessGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<BrandModel> {
    return this.brandsService.update(id, updateBrandDto);
  }

  /**
   * Controller to delete a brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiOkResponse({ type: BrandModel, description: 'Deleted brand' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Brand not found' })
  @ApiConflictResponse({
    type: BasicStatusResponse,
    description: 'Brand cannot be deleted because it is in use',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while deleting the brand',
  })
  @UseGuards(AuthGuard, AccessGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BrandModel> {
    return this.brandsService.delete(id);
  }
}
