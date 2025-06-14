import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/generateToken';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return;
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET || 'default');
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
    return;
  }
}
