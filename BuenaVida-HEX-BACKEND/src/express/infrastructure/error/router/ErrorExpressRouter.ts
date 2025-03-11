import { Router, Request, Response, NextFunction } from 'express';
import RouterExpressInterface from '../../../domain/RouterExpressInterface';
import ErrorExpressController from '../controller/ErrorExpressController';

export default class ErrorExpressRouter implements RouterExpressInterface {
  private router: Router;
  private errorController: ErrorExpressController;

  constructor() {
    this.router = Router();
    this.errorController = new ErrorExpressController();
    this.initRoutes();
  }

  private initRoutes(): void {
    // Middleware para capturar errores
    this.router.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
      this.errorController.internalServerError(req, res, err);
    });

    // Ruta para 404
    this.router.use((req: Request, res: Response) => {
      this.errorController.notFound(req, res);
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}