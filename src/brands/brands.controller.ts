import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { BrandModel } from 'src/utils/models/brand.model';
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
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
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
  @ApiOkResponse({ type: [BrandModel], description: 'Brands found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get()
  async getAll(): Promise<BrandModel[]> {
    return this.brandsService.getAll();
  }

  /**
   * Controller to get a brand by id
   */
  @ApiOperation({ summary: 'Get a brand by id' })
  @ApiOkResponse({ type: BrandModel, description: 'Brand found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<BrandModel> {
    return this.brandsService.get(id);
  }

  /**
   * Controller to create a new brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new brand' })
  @ApiCreatedResponse({ type: BrandModel, description: 'Brand created' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AdminGuard)
  @Post()
  async create(@Body() createBrandDto: CreateBrandDto): Promise<BrandModel> {
    return this.brandsService.create(createBrandDto);
  }

  /**
   * Controller to update a brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a brand' })
  @ApiOkResponse({ type: BrandModel, description: 'Brand updated' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  async update(@Param() id: string, @Body() updateBrandDto: UpdateBrandDto): Promise<BrandModel> {
    return this.brandsService.update(id, updateBrandDto);
  }

  /**
   * Controller to delete a brand
   */
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a brand' })
  @ApiOkResponse({ type: BrandModel, description: 'Brand deleted' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<BrandModel> {
    return this.brandsService.delete(id);
  }
}
