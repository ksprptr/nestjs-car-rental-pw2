import { FrontendBrand } from './brand.types';
import { Color, Vehicle, VehicleAttributes } from 'prisma/generated/prisma';

export type FrontendVehicle = Omit<Vehicle, 'attributesId' | 'brandId' | 'colorId'> & {
  attributes: VehicleAttributes;
  brand: FrontendBrand;
  color: Color;
};
