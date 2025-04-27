import { Prisma } from 'prisma/generated/prisma';
import { colorSelect } from './color.selection';
import { brandSelect } from './brand.selection';

export const vehicleSelect: Prisma.VehicleSelect = {
  id: true,
  model: true,
  priceUsd: true,
  attributes: true,
  brand: {
    select: brandSelect,
  },
  brandId: false,
  color: {
    select: colorSelect,
  },
  colorId: false,
  createdAt: true,
  updatedAt: true,
  owner: false,
  ownerId: false,
  _count: false,
  favouritedByUsers: false,
};
