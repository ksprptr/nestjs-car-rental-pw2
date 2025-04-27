import { Country, Brand } from 'prisma/generated/prisma';

export type FrontendBrand = Omit<Brand, 'countryId'> & { country: Country };
