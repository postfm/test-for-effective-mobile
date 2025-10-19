import prisma from '../../../prisma/prisma';
import { JwtPayload, UserRole, UserStatus, type UpdateUser } from '../types/user-interface';
import { userRepository } from '../repository/user.repository';
import { Response } from 'express';

export const userService = {
  getUsers: async () => {
    return userRepository.getUsers();
  },

  getUser: async (res: Response, id: string, user: JwtPayload | undefined) => {
    const isUserExist = await prisma.user.findUnique({
      where: { id, status: UserStatus.ACTIVE },
      select: {
        id: true,
        birthday: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!isUserExist) {
      return res.status(404).json({ error: `Пользователь с id: ${id} не найден` });
    }

    if (user?.role !== UserRole.ADMIN && user?.userId !== id) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }

    return isUserExist;
  },

  deleteUser: async (res: Response, id: string, user: JwtPayload | undefined) => {
    if (user?.role !== UserRole.ADMIN && user?.role !== id) {
      throw new Error('Недостаточно прав.');
    }

    if (user?.userId === id) {
      throw new Error('Нельзя удалить свой аккаунт.');
    }

    await userRepository.deleteUser(id);
  },
};
