import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
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
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

/**
 * Class representing an addresses controller
 */
@ApiTags('Addresses')
@ApiBearerAuth()
@UseGuards(AuthGuard, AdminGuard)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  /**
   * Controller to get all addresses
   */
  @ApiOperation({ summary: 'Get all addresses' })
  @ApiOkResponse({ type: [AddressModel], description: 'Addresses found' })
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
  @ApiOkResponse({ type: AddressModel, description: 'Address found' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Get(':id')
  async get(@Param('id') id: string): Promise<AddressModel> {
    return this.addressesService.get(id);
  }

  /**
   * Controller to create a new address
   */
  @ApiOperation({ summary: 'Create a new address' })
  @ApiOkResponse({ type: AddressModel, description: 'Address created' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<AddressModel> {
    return this.addressesService.create(createAddressDto);
  }

  /**
   * Controller to update an address
   */
  @ApiOperation({ summary: 'Update an address' })
  @ApiOkResponse({ type: AddressModel, description: 'Address updated' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<AddressModel> {
    return this.addressesService.update(id, updateAddressDto);
  }

  /**
   * Controller to delete an address
   */
  @ApiOperation({ summary: 'Delete an address' })
  @ApiOkResponse({ type: AddressModel, description: 'Address deleted' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiForbiddenResponse({ type: BasicStatusResponse, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<AddressModel> {
    return this.addressesService.delete(id);
  }
}
