import { Request, Response } from 'express';
import { CreateUser, LoginUser, UserRole } from '../types/user-interface';
import prisma from '../prisma/prisma';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, role, status }: CreateUser = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: (role.toUpperCase() as UserRole) || UserRole.USER,
          status,
        },
      });

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as UserRole,
      });

      res.status(201).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      console.error('Registration error', error);
      res.status(400).json({ error: 'Ошибка при регистрации.' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginUser = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Неверный email или пароль' });
      }

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as UserRole,
      });

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    } catch (error) {
      console.error('Login error', error);
      res.status(400).json({ error: 'Ошибка при входе.' });
    }
  },
};
