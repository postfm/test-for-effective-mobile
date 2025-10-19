import { Request, Response } from 'express';
import { LoginUser } from '../../user/types/user-interface';
import { authService } from '../services/auth.services';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const newUser = await authService.register(req.body);

      res.status(201).json(newUser);
    } catch (error) {
      console.error('Registration error', error);
      res.status(400).json({ error: 'Ошибка при регистрации.' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginUser = req.body;
      const authUser = await authService.login(email, password);

      res.json(authUser);
    } catch (error) {
      console.error('Login error', error);
      res.status(400).json({ error: 'Ошибка при входе.' });
    }
  },
};
