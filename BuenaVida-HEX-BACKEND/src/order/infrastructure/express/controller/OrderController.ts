import { Request, Response } from "express";
import OrderControllerExpressInterface from "../../../domain/interfaces/OrderControllerExpressInterface";
import OrderUseCasePort from "../../../domain/port/driver/OrderUseCasePort";
import OrdersToJson from "./OrdersToJson";

export default class OrderController implements OrderControllerExpressInterface {
  constructor(private readonly orderUseCase: OrderUseCasePort) {}

  createOrder(req: Request, res: Response): void {
    const { userId, cartId, shippingAddress, paymentMethod } = req.body;

    if (!userId || !cartId || !shippingAddress || !paymentMethod) {
      res.status(400).json({
        error: "userId, cartId, shippingAddress and paymentMethod are required"
      });
      return;
    }

    this.orderUseCase
      .createOrder(userId, cartId, shippingAddress, paymentMethod)
      .then(order => {
        res.status(201).json(OrdersToJson.getSingle(order));
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
  }

  getOrderById(req: Request, res: Response): void {
    const id = req.params["id"];

    if (!id) {
      res.status(400).json({ error: "Order ID is required" });
      return;
    }

    this.orderUseCase
      .getOrderById(id)
      .then(order => {
        if (order.isNull()) {
          res.status(404).json({ error: "Order not found" });
          return;
        }
        res.status(200).json(OrdersToJson.getSingle(order));
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  getOrdersByUserId(req: Request, res: Response): void {
    const userId = req.params["userId"];

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    this.orderUseCase
      .getOrdersByUserId(userId)
      .then(orders => {
        const ordersJson = OrdersToJson.get(orders);
        
        // Si el primer elemento es un NullOrder, devolvemos un array vacío
        if (ordersJson.length === 0) {
          res.status(200).json([]);
          return;
        }
        
        res.status(200).json(ordersJson);
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  updateOrderStatus(req: Request, res: Response): void {
    const id = req.params["id"];
    const { status } = req.body;

    if (!id) {
      res.status(400).json({ error: "Order ID is required" });
      return;
    }

    if (!status) {
      res.status(400).json({ error: "Status is required" });
      return;
    }

    this.orderUseCase
      .updateOrderStatus(id, status)
      .then(order => {
        if (order.isNull()) {
          res.status(404).json({ error: "Order not found" });
          return;
        }
        res.status(200).json(OrdersToJson.getSingle(order));
      })
      .catch(error => {
        res.status(400).json({ error: error.message });
      });
  }
}