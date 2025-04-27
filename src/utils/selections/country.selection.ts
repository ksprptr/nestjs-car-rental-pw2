import { Prisma } from 'prisma/generated/prisma';

export const countrySelect: Prisma.CountrySelect = {
  id: true,
  name: true,
  isoCode: true,
  continent: true,
  population: true,
  createdAt: true,
  updatedAt: true,
  addresses: false,
  _count: false,
  brands: false,
};
