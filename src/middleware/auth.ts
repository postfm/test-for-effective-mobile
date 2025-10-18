import passport from 'passport';
import { UserRole } from '../types/user-interface';
import { Request, Response, NextFunction } from 'express';

export const authenticate = passport.authenticate('jwt', { session: false });

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Недостаточно прав для выполнения операции',
      });
    }

    next();
  };
};

export const requireAdmin = authorize([UserRole.ADMIN]);
export const requireUser = authorize([UserRole.USER]);
export const requiredAuth = authenticate;

export const isOwnerOrAdmin = (resourceOwnerId: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    if (req.user.role !== UserRole.ADMIN && req.user.userId !== resourceOwnerId) {
      return res.status(403).json({ error: 'Недостаточно прав' });
    }

    next();
  };
};
