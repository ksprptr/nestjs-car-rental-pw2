import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { CountryModel } from 'src/utils/models/country.model';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from 'src/utils/dto/countries-dto/create-country.dto';
import { UpdateCountryDto } from 'src/utils/dto/countries-dto/update-country.dto';
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
 * Class representing a countries controller
 */
@ApiTags('Countries')
@ApiBearerAuth()
@UseGuards(AuthGuard, AccessGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  /**
   * Controller to get all countries
   */
  @ApiOperation({ summary: 'Get all countries' })
  @ApiOkResponse({ type: [CountryModel], description: 'Countries found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get()
  async getAll(): Promise<CountryModel[]> {
    return this.countriesService.getAll();
  }

  /**
   * Controller to get a country by id
   */
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiOkResponse({ type: CountryModel, description: 'Country found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<CountryModel> {
    return this.countriesService.get(id);
  }

  /**
   * Controller to create a new country
   */
  @ApiOperation({ summary: 'Create a new country' })
  @ApiCreatedResponse({ type: CountryModel, description: 'Country created' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Post()
  async create(@Body() createCountryDto: CreateCountryDto): Promise<CountryModel> {
    return this.countriesService.create(createCountryDto);
  }

  /**
   * Controller to update a country
   */
  @ApiOperation({ summary: 'Update a country' })
  @ApiOkResponse({ type: CountryModel, description: 'Country updated' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ): Promise<CountryModel> {
    return this.countriesService.update(id, updateCountryDto);
  }

  /**
   * Controller to delete a country
   */
  @ApiOperation({ summary: 'Delete a country' })
  @ApiOkResponse({ type: CountryModel, description: 'Country deleted' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CountryModel> {
    return this.countriesService.delete(id);
  }
}
