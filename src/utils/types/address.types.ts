import { Address } from 'prisma/generated/prisma';
import { CountryWithoutTimestamps } from './country.types';

export type FullAddress = Omit<Address, 'countryId' | 'createdAt' | 'updatedAt'> & {
  country: CountryWithoutTimestamps;
};
