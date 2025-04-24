import { Mark } from 'prisma/generated/prisma';
import { CountryWithoutTimestamps } from './country.types';

export type FullMark = Omit<Mark, 'countryId' | 'createdAt' | 'updatedAt'> & {
  country: CountryWithoutTimestamps;
};
