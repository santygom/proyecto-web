import { Router } from "express";
import CartRouterExpressInterface from "../../../domain/interfaces/CartRouterExpressInterface";
import CartController from "../controller/CartController";
import CartUseCase from "../../../application/usecase/CartUseCase";
import CartService from "../../../application/service/CartService";
import CartRepository from "../../repository/CartRepository";
import ProductService from "../../../../product/application/service/ProductService";
import ProductRepository from "../../../../product/infrastructure/repository/ProductRepository";

export default class CartRouter implements CartRouterExpressInterface {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    const cartRepository = new CartRepository();
    const productRepository = new ProductRepository();
    const productService = new ProductService(productRepository);
    const cartService = new CartService(cartRepository);
    const cartUseCase = new CartUseCase(cartService, productService);
    const cartController = new CartController(cartUseCase);

    this.router.get("/:userId", cartController.getCart.bind(cartController));
    this.router.post("/add", cartController.addToCart.bind(cartController));
    this.router.delete("/:userId/items/:itemId", cartController.removeFromCart.bind(cartController));
    this.router.put("/:userId/items/:itemId", cartController.updateCartItemQuantity.bind(cartController));
    this.router.delete("/:userId/clear", cartController.clearCart.bind(cartController));
  }

  public getRouter(): Router {
    return this.router;
  }
}