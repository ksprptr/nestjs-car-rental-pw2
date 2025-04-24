import { Color } from 'prisma/generated/prisma';

export type ColorWithoutTimestamps = Omit<Color, 'createdAt' | 'updatedAt'>;
