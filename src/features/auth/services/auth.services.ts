import { Request, Response } from 'express';
import { CreateUser, LoginUser } from '../../user/types/user-interface';
import prisma from '../../../prisma/prisma';
import bcrypt from 'bcryptjs';
import { authRepository } from '../repository/auth.repository';

export const authService = {
  async register(data: CreateUser) {
    const { email } = data;

    const isUserExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isUserExist) {
      throw new Error('Пользователь с таким email уже существует');
    }

    return authRepository.register(data);
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Неверный email или пароль');
    }
    return authRepository.login(email);
  },
};
