import { Request, Response } from "express";

export default interface OrderControllerExpressInterface {
  createOrder(req: Request, res: Response): void;
  getOrderById(req: Request, res: Response): void;
  getOrdersByUserId(req: Request, res: Response): void;
  updateOrderStatus(req: Request, res: Response): void;
}