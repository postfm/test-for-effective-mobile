import prisma from '../../../prisma/prisma';
import { UserStatus, type UpdateUser } from '../types/user-interface';

export const userRepository = {
  getUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        birthday: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });
  },

  getUser: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  deleteUser: async (id: string) => {
    await prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.NOT_ACTIVE,
      },
    });
  },
};
