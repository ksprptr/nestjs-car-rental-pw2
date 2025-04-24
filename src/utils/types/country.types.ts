import { Country } from 'prisma/generated/prisma';

export type CountryWithoutTimestamps = Omit<Country, 'createdAt' | 'updatedAt'>;
