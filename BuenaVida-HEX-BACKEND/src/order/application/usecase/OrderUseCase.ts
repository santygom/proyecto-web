import Order from "../../domain/order/Order";
import NullOrder from "../../domain/order/NullOrder";
import OrderInterface from "../../domain/api/OrderInterface";
import OrderServiceInterface from "../../domain/interfaces/OrderServiceInterface";
import OrderUseCasePort from "../../domain/port/driver/OrderUseCasePort";

export default class OrderUseCase implements OrderUseCasePort {
  constructor(private readonly orderService: OrderServiceInterface) {}

  public async createOrder(
    userId: string,
    cartId: string,
    shippingAddress: string,
    paymentMethod: string
  ): Promise<Order> {
    try {
      return await this.orderService.createOrder(
        userId,
        cartId,
        shippingAddress,
        paymentMethod
      );
    } catch (error: any) {
      throw new Error(`Error creating order: ${error.message}`);
    }
  }

  public async getOrderById(id: string): Promise<Order> {
    const order = await this.orderService.retrieveOrderById(id);
    
    if (order.isNull()) {
      return new NullOrder();
    }

    return order;
  }

  public async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await this.orderService.retrieveOrdersByUserId(userId);

    if (orders.length === 0) {
      return [new NullOrder()];
    }

    return orders;
  }

  public async updateOrderStatus(id: string, status: string): Promise<Order> {
    try {
      // Validar que el estado sea válido
      const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
      
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}. Valid statuses are: ${validStatuses.join(', ')}`);
      }
      
      return await this.orderService.updateOrderStatus(id, status);
    } catch (error: any) {
      throw new Error(`Error updating order status: ${error.message}`);
    }
  }
}