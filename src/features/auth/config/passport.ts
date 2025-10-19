import { ExtractJwt, StrategyOptions, Strategy as JwtStrategy } from 'passport-jwt';
import { JwtPayload, UserRole, UserStatus } from '../../user/types/user-interface';
import prisma from '../../../prisma/prisma';
import passport from 'passport';

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secret-key',
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (payload: JwtPayload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (user) {
      if (user.status !== UserStatus.ACTIVE) {
        return done(null, false, { message: 'Аккаунт не активен' });
      }

      return done(null, {
        userId: user.id,
        email: user.email,
        role: user.role as UserRole,
        status: user.status as UserStatus,
      });
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

export default passport;
