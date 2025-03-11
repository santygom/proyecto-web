import { Request, Response } from "express";

export default interface CartControllerExpressInterface {
  getCart(req: Request, res: Response): void;
  addToCart(req: Request, res: Response): void;
  removeFromCart(req: Request, res: Response): void;
  updateCartItemQuantity(req: Request, res: Response): void;
  clearCart(req: Request, res: Response): void;
}