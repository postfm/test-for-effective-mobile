import type { Request, Response } from 'express';
import { type UpdateUser } from '../types/user-interface';
import { userService } from '../services/user.service';

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера. Мы уже бежим исправлять это!' });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userService.getUser(res, id, req.user);

      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера. Мы уже бежим исправлять это!' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await userService.deleteUser(res, id, req.user);

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Ошибка при удалении пользователя.' });
    }
  },
};
