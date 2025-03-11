import { Request, Response } from "express";
import CartControllerExpressInterface from "../../../domain/interfaces/CartControllerExpressInterface";
import CartUseCasePort from "../../../domain/port/driver/CartUseCasePort";
import CartToJson from "./CartToJson";

export default class CartController implements CartControllerExpressInterface {
  constructor(private readonly cartUseCase: CartUseCasePort) {}

  getCart(req: Request, res: Response): void {
    // En una aplicación real, obtendrías el userId del token de autenticación
    const userId = req.params["userId"] || req.query["userId"] as string;
    
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }
    
    this.cartUseCase
      .getCart(userId)
      .then(cart => {
        if (cart.isNull()) {
          // No es un error, simplemente el usuario no tiene un carrito aún
          res.status(200).json({ 
            id: null,
            userId, 
            items: [],
            itemCount: 0,
            total: 0
          });
          return;
        }
        
        res.status(200).json(CartToJson.get(cart));
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  addToCart(req: Request, res: Response): void {
    const { userId, productId, quantity } = req.body;
    
    if (!userId || !productId || !quantity) {
      res.status(400).json({ error: "userId, productId and quantity are required" });
      return;
    }
    
    if (quantity <= 0) {
      res.status(400).json({ error: "Quantity must be greater than 0" });
      return;
    }
    
    this.cartUseCase
      .addToCart({ userId, productId, quantity })
      .then(cart => {
        if (cart.isNull()) {
          res.status(404).json({ error: "Product not found" });
          return;
        }
        
        res.status(200).json(CartToJson.get(cart));
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
  }

  removeFromCart(req: Request, res: Response): void {
    const userId = req.params["userId"] || req.body.userId;
    const itemId = req.params["itemId"] || req.body.itemId;
    
    if (!userId || !itemId) {
      res.status(400).json({ error: "userId and itemId are required" });
      return;
    }
    
    this.cartUseCase
      .removeFromCart(userId, itemId)
      .then(cart => {
        res.status(200).json(CartToJson.get(cart));
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  updateCartItemQuantity(req: Request, res: Response): void {
    const userId = req.params["userId"] || req.body.userId;
    const itemId = req.params["itemId"] || req.body.itemId;
    const { quantity } = req.body;
    
    if (!userId || !itemId || quantity === undefined) {
      res.status(400).json({ error: "userId, itemId and quantity are required" });
      return;
    }
    
    this.cartUseCase
      .updateCartItemQuantity(userId, itemId, quantity)
      .then(cart => {
        res.status(200).json(CartToJson.get(cart));
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  clearCart(req: Request, res: Response): void {
    const userId = req.params["userId"] || req.body.userId;
    
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }
    
    this.cartUseCase
      .clearCart(userId)
      .then(cart => {
        res.status(200).json(CartToJson.get(cart));
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }
}