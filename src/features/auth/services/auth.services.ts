import { Response } from 'express';
import { CreateUser, UserStatus } from '../../user/types/user-interface';
import prisma from '../../../prisma/prisma';
import bcrypt from 'bcryptjs';
import { authRepository } from '../repository/auth.repository';

export const authService = {
  async register(res: Response, data: CreateUser) {
    const { email } = data;

    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    return authRepository.register(data);
  },

  async login(res: Response, email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    if (user.status !== UserStatus.ACTIVE) {
      return res.status(403).json({
        error: `Аккаунт ${user.status.toLowerCase()}. Обратитесь к администратору.`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    return authRepository.login(email);
  },
};
