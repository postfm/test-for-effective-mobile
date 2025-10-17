import type { Request, Response } from 'express';
import prisma from '../prisma/prisma';
import type { CreateUser, UpdateUser } from '../types/user-interface';

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
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
      });

      if (!user) {
        return res.status(404).json({ error: `Пользователь с id: ${id} не найден` });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера. Мы уже бежим исправлять это!' });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const data = req.body as CreateUser;

      const user = await prisma.user.create({
        data,
      });

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Ошибка при создании пользователя.' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = req.body as UpdateUser;

      const user = await prisma.user.update({
        where: { id },
        data,
      });

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Ошибка при обновлении пользователя.' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

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
