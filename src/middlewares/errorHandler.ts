import type { NextFunction, Request, Response } from "express";

export interface AppError extends Error {
  status?: number;
}


export const errorHandle = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
  });
}
