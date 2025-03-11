import { Request, Response } from "express";

export default interface AuthControllerExpressInterface {
  login(req: Request, res: Response): void;
  validateToken(req: Request, res: Response): void;
}