import { Prisma } from 'prisma/generated/prisma';

export const colorSelect: Prisma.ColorSelect = {
  id: true,
  name: true,
  hex: true,
  brightnessLevel: true,
  metallic: true,
  createdAt: true,
  updatedAt: true,
  _count: false,
  vehicles: false,
};
