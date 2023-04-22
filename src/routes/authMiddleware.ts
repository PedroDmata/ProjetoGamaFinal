import { Request, Response, NextFunction } from 'express';

import { verify } from "jsonwebtoken";

// Middleware de autenticação
export function authMiddleware(req: Request | any, res: Response, next: NextFunction) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {

    return res.status(401).json({ message: 'Token de autenticação ausente ou inválido' });
  }

  const token = req.headers.authorization.slice(7);

  const secret = process.env.JWT_SECRET || "";
  const decodedToken = verify(token, secret);

  if (!decodedToken) return res.status(401).json({ message: 'Token de autenticação inválido' });

  req.user = decodedToken;

  next();
}