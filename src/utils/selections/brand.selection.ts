import { Prisma } from 'prisma/generated/prisma';
import { countrySelect } from './country.selection';

export const brandSelect: Prisma.BrandSelect = {
  id: true,
  name: true,
  country: {
    select: countrySelect,
  },
  countryId: false,
  foundedYear: true,
  description: true,
  createdAt: true,
  updatedAt: true,
  _count: false,
  vehicles: false,
};
