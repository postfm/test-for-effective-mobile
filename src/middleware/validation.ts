import type { Request, Response, NextFunction } from 'express';

export const validateUser = (
  req: Request<unknown, unknown, { email?: unknown }>,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: 'Email не может быть пустым' });
  }

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Email должен быть строкой' });
  }

  next();
};
