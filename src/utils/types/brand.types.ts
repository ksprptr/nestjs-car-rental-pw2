import { Country, Brand } from 'prisma/generated/prisma';

export type FullBrand = Omit<Brand, 'countryId'> & { country: Country };
