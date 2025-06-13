import logger from '../utils/logger'
import type { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const { statusCode } = res;
    const duration = Date.now() - start;

    const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
    
    if (statusCode >= 500) {
      logger.error(message);
    } else if (statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.http(message);
    }
  });

  try {
    next();
  } catch (error) {
    const errorMessage = `${method} ${originalUrl} - Error: ${(error as Error).message}`;
    logger.error(errorMessage);
    res.status(500).send('Internal Server Error');
  }
}
