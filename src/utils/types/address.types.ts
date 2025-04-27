import { Address, Country } from 'prisma/generated/prisma';

export type FrontendAddress = Omit<Address, 'countryId'> & { country: Country };
