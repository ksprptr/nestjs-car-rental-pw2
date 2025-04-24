import { FullMark } from './mark.types';
import { ColorWithoutTimestamps } from './color.types';
import { Vehicle, VehicleAttributes } from 'prisma/generated/prisma';

export type FullVehicle = Omit<
  Vehicle,
  'attributesId' | 'markId' | 'colorId' | 'createdAt' | 'updatedAt'
> & {
  attributes: VehicleAttributes;
  mark: FullMark;
  color: ColorWithoutTimestamps;
};
