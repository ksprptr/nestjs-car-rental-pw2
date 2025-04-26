import { FullBrand } from './brand.types';
import { Color, Vehicle, VehicleAttributes } from 'prisma/generated/prisma';

export type FullVehicle = Omit<Vehicle, 'attributesId' | 'brandId' | 'colorId'> & {
  attributes: VehicleAttributes;
  brand: FullBrand;
  color: Color;
};
