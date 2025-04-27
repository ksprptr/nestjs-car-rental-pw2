import { Prisma } from 'prisma/generated/prisma';
import { addressSelect } from './address.selection';

export const userSelect: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  password: false,
  address: {
    select: addressSelect,
  },
  addressId: false,
  role: true,
  createdAt: true,
  updatedAt: true,
  _count: false,
  vehicles: false,
};
