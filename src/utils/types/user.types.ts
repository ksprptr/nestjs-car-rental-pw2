import { User } from 'prisma/generated/prisma';
import { FullAddress } from './address.types';

export type FrontendUser = Omit<User, 'password' | 'addressId'> & { address: FullAddress };
