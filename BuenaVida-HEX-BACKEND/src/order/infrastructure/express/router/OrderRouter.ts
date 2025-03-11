import { Router } from "express";
import OrderRouterExpressInterface from "../../../domain/interfaces/OrderRouterExpressInterface";
import OrderController from "../controller/OrderController";
import OrderUseCase from "../../../application/usecase/OrderUseCase";
import OrderService from "../../../application/service/OrderService";
import OrderRepository from "../../repository/OrderRepository";
import CartService from "../../../../cart/application/service/CartService";
import CartRepository from "../../../../cart/infrastructure/repository/CartRepository";
import ProductService from "../../../../product/application/service/ProductService";
import ProductRepository from "../../../../product/infrastructure/repository/ProductRepository";

export default class OrderRouter implements OrderRouterExpressInterface {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    // Configurar repositorios
    const orderRepository = new OrderRepository();
    const cartRepository = new CartRepository();
    const productRepository = new ProductRepository();
    
    // Configurar servicios
    const cartService = new CartService(cartRepository);
    const productService = new ProductService(productRepository);
    const orderService = new OrderService(orderRepository, cartService, productService);
    
    // Configurar casos de uso
    const orderUseCase = new OrderUseCase(orderService);
    
    // Configurar controlador
    const orderController = new OrderController(orderUseCase);

    // Definir rutas
    this.router.post("/", orderController.createOrder.bind(orderController));
    this.router.get("/:id", orderController.getOrderById.bind(orderController));
    this.router.get("/user/:userId", orderController.getOrdersByUserId.bind(orderController));
    this.router.patch("/:id/status", orderController.updateOrderStatus.bind(orderController));
  }

  public getRouter(): Router {
    return this.router;
  }
}