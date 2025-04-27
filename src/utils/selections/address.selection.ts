import { Prisma } from 'prisma/generated/prisma';
import { countrySelect } from './country.selection';

export const addressSelect: Prisma.AddressSelect = {
  id: true,
  city: true,
  countryId: false,
  country: {
    select: countrySelect,
  },
  zip: true,
  streetName: true,
  streetNumber: true,
  createdAt: true,
  updatedAt: true,
  users: false,
  _count: false,
};
