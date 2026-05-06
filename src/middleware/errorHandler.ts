import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError('Route not found', 404));
};

export const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;

  res.status(statusCode).json({
    message: error.message || 'Internal server error',
    statusCode
  });
};
