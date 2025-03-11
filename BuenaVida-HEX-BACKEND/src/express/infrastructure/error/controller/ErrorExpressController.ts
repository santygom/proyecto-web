import { Request, Response } from 'express';
import ErrorControllerExpressInterface from '../../../domain/ErrorControllerExpressInterface';

export default class ErrorExpressController implements ErrorControllerExpressInterface {
  notFound(_req: Request, res: Response): void {
    res.status(404).json({
      status: 404,
      message: 'Route not found'
    });
  }

  internalServerError(_req: Request, res: Response, error: Error): void {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal server error'
    });
  }
}