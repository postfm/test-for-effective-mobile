import prisma from '../../../prisma/prisma';
import { type UpdateUser } from '../types/user-interface';

export const userRepository = {
  getUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
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

  updateUser: async (id: string, data: UpdateUser) => {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  deleteUser: async (id: string) => {
    await prisma.user.delete({
      where: { id },
    });
  },
};
