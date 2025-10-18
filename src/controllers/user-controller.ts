import type { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import { UserRole, type CreateUser, type UpdateUser } from '../types/user-interface';

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера. Мы уже бежим исправлять это!' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: `Пользователь с id: ${id} не найден` });
      }

      if (req.user?.role !== UserRole.ADMIN && req.user?.userId !== id) {
        return res.status(403).json({ error: 'Недостаточно прав.' });
      }

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера. Мы уже бежим исправлять это!' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body as UpdateUser;

      console.log(req.body);

      if (req.user?.role !== UserRole.ADMIN && req.user?.userId !== id) {
        return res.status(403).json({ error: 'Недостаточно прав.' });
      }

      const user = await prisma.user.update({
        where: { id },
        data,
      });

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Ошибка при обновлении пользователя.' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (req.user?.role !== UserRole.ADMIN && req.user?.role !== id) {
        return res.status(403).json({ error: 'Недостаточно прав.' });
      }

      if (req.user?.userId === id) {
        return res.status(400).json({ error: 'Нельзя удалить свой аккаунт.' });
      }

      await prisma.user.delete({
        where: { id },
      });

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Ошибка при удалении пользователя.' });
    }
  },
};
