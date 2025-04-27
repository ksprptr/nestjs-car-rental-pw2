import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { AddressModel } from 'src/utils/models/address.model';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from 'src/utils/dto/addresses-dto/create-address.dto';
import { UpdateAddressDto } from 'src/utils/dto/addresses-dto/update-address.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

/**
 * Class representing an addresses controller
 */
@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(AuthGuard, AccessGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  /**
   * Controller to get all addresses
   */
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({ type: [AddressModel], description: 'Addresses' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get()
  async getAll(): Promise<AddressModel[]> {
    return this.addressesService.getAll();
  }

  /**
   * Controller to get an address by id
   */
  @ApiOperation({ summary: 'Get an address by id' })
  @ApiOkResponse({ type: AddressModel, description: 'Address' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Address not found' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<AddressModel> {
    return this.addressesService.get(id);
  }

  /**
   * Controller to create a new address
   */
  @ApiOperation({ summary: 'Create a new address' })
  @ApiCreatedResponse({ type: AddressModel, description: 'Created address' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Country not found' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while creating the address',
  })
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<AddressModel> {
    return this.addressesService.create(createAddressDto);
  }

  /**
   * Controller to update an address
   */
  @ApiOperation({ summary: 'Update an address' })
  @ApiOkResponse({ type: AddressModel, description: 'Updated address' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Address or country not found' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while updating the address',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressModel> {
    return this.addressesService.update(id, updateAddressDto);
  }

  /**
   * Controller to delete an address
   */
  @ApiOperation({ summary: 'Delete an address' })
  @ApiOkResponse({ type: AddressModel, description: 'Deleted address' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Address not found' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while deleting the address',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AddressModel> {
    return this.addressesService.delete(id);
  }
}
