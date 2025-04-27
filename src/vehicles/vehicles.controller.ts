import { AuthGuard } from 'src/auth/guards/auth.guard';
import { FrontendUser } from 'src/utils/types/user.types';
import { VehicleModel } from 'src/utils/models/vehicle.model';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from 'src/utils/dto/vehicles-dto/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/utils/dto/vehicles-dto/update-vehicle.dto';
import { BasicStatusResponse } from 'src/utils/models/response.model';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

/**
 * Class representing a vehicles controller
 */
@ApiBearerAuth()
@ApiTags('Vehicles')
@UseGuards(AuthGuard)
@Controller('me')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  /**
   * Controller to create a new vehicle
   */
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiOkResponse({ type: VehicleModel, description: 'Created vehicle' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Brand or color not found' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while creating the vehicle',
  })
  @Post('vehicles')
  async createVehicle(
    @Req() request: Request,
    @Body() createVehicleDto: CreateVehicleDto,
  ): Promise<VehicleModel> {
    const user: FrontendUser = request['user'];
    const id = user.id;

    return this.vehiclesService.create(id, createVehicleDto);
  }

  /**
   * Controller to update a vehicle
   */
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiOkResponse({ type: VehicleModel, description: 'Updated vehicle' })
  @ApiBadRequestResponse({ type: BasicStatusResponse, description: 'Validation failed' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({
    type: BasicStatusResponse,
    description: 'Vehicle attributes, brand or color not found',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while updating the vehicle',
  })
  @Patch('vehicles/:id')
  async updateVehicle(
    @Req() request: Request,
    @Param('id') vehicleId: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ): Promise<VehicleModel> {
    const user: FrontendUser = request['user'];
    const id = user.id;
    return this.vehiclesService.update(id, vehicleId, updateVehicleDto);
  }

  /**
   * Controller to delete a vehicle
   */
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiOkResponse({ type: VehicleModel, description: 'Deleted vehicle' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Vehicle not found' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while deleting the vehicle',
  })
  @Delete('vehicles/:id')
  async deleteVehicle(
    @Req() request: Request,
    @Param('id') vehicleId: string,
  ): Promise<VehicleModel> {
    const user: FrontendUser = request['user'];
    const id = user.id;

    return this.vehiclesService.delete(id, vehicleId);
  }

  /**
   * Controller to get a currently logged in user's favourite vehicles
   */
  @ApiOperation({ summary: "Get currently logged in user's favourite vehicles" })
  @ApiOkResponse({ type: [VehicleModel], description: "User's favourite vehicles" })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @Get('favourite-vehicles')
  async getUserFavouriteVehicles(@Req() request: Request): Promise<VehicleModel[]> {
    const user: FrontendUser = request['user'];
    const id = user.id;

    return this.vehiclesService.getFavouriteVehicles(id);
  }

  /**
   * Controller to add a vehicle to currently logged in user's favourites
   */
  @ApiOperation({ summary: 'Add a vehicle to favourites' })
  @ApiOkResponse({ type: BasicStatusResponse, description: 'Vehicle added to favourites' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({ type: BasicStatusResponse, description: 'Vehicle not found' })
  @ApiConflictResponse({ type: BasicStatusResponse, description: 'Vehicle already in favourites' })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while adding the vehicle to favourites',
  })
  @Post('favourite-vehicles/:id')
  async addToFavourites(
    @Req() request: Request,
    @Param('id') vehicleId: string,
  ): Promise<BasicStatusResponse> {
    const user: FrontendUser = request['user'];
    const id = user.id;

    return this.vehiclesService.addToFavourites(id, vehicleId);
  }

  /**
   * Controller to remove a vehicle from currently logged in user's favourites
   */
  @ApiOperation({ summary: 'Remove a vehicle from favourites' })
  @ApiOkResponse({ type: BasicStatusResponse, description: 'Vehicle removed from favourites' })
  @ApiUnauthorizedResponse({ type: BasicStatusResponse, description: 'Unauthorized' })
  @ApiNotFoundResponse({
    type: BasicStatusResponse,
    description: 'Vehicle not found or not found in favourites',
  })
  @ApiInternalServerErrorResponse({
    type: BasicStatusResponse,
    description: 'An unexpected error occurred while removing the vehicle from favourites',
  })
  @Delete('favourite-vehicles/:id')
  async removeFromFavourites(
    @Req() request: Request,
    @Param('id') vehicleId: string,
  ): Promise<BasicStatusResponse> {
    const user: FrontendUser = request['user'];
    const id = user.id;

    return this.vehiclesService.removeFromFavourites(id, vehicleId);
  }
}
