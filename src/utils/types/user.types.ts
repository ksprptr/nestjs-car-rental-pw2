import { User } from 'prisma/generated/prisma';
import { FrontendAddress } from './address.types';

export type FrontendUser = Omit<User, 'password' | 'addressId'> & { address: FrontendAddress };
