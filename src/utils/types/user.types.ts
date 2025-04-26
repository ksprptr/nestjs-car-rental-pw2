import { User } from 'prisma/generated/prisma';
import { FullAddress } from './address.types';

export type FullUser = Omit<User, 'password' | 'addressId'> & { address: FullAddress };
