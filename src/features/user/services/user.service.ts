import prisma from '../../../prisma/prisma';
import { JwtPayload, UserRole, type UpdateUser } from '../types/user-interface';
import { userRepository } from '../repository/user.repository';

export const userService = {
  getUsers: async () => {
    return userRepository.getUsers();
  },

  getUser: async (id: string, user: JwtPayload | undefined) => {
    const isUserExist = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!isUserExist) {
      throw new Error(`Пользователь с id: ${id} не найден`);
    }

    if (user?.role !== UserRole.ADMIN && user?.userId !== id) {
      throw new Error('Недостаточно прав.');
    }

    return isUserExist;
  },

  updateUser: async (id: string, data: UpdateUser, user: JwtPayload | undefined) => {
    if (user?.role !== UserRole.ADMIN && user?.userId !== id) {
      throw new Error('Недостаточно прав.');
    }

    const isUserExist = await prisma.user.update({
      where: { id },
      data,
    });

    return {
      id: isUserExist.id,
      name: isUserExist.name,
      email: isUserExist.email,
      role: isUserExist.role,
      status: isUserExist.status,
    };
  },

  deleteUser: async (id: string, user: JwtPayload | undefined) => {
    if (user?.role !== UserRole.ADMIN && user?.role !== id) {
      throw new Error('Недостаточно прав.');
    }

    if (user?.userId === id) {
      throw new Error('Нельзя удалить свой аккаунт.');
    }

    await userRepository.deleteUser(id);
  },
};
