import Order from "../../order/Order";

export default interface OrderUseCasePort {
  createOrder(userId: string, cartId: string, shippingAddress: string, paymentMethod: string): Promise<Order>;
  getOrderById(id: string): Promise<Order>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
}