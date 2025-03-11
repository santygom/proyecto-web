import { Request, Response } from "express";

export default interface UserControllerExpressInterface {
  getUsers(req: Request, res: Response): void;
  getUserById(req: Request, res: Response): void;
  createUser(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
}