import { Address, Country } from 'prisma/generated/prisma';

export type FullAddress = Omit<Address, 'countryId'> & { country: Country };
