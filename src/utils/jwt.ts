import { JwtPayload } from './../types/user-interface';
import { StringValue } from 'ms';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: (process.env.JWT_EXPIRE as StringValue) || '7d',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret-key') as JwtPayload;
};
