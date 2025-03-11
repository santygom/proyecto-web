import { Request, Response } from 'express';

export default interface ErrorControllerExpressInterface {
  notFound(req: Request, res: Response): void;
  internalServerError(req: Request, res: Response, error: Error): void;
}