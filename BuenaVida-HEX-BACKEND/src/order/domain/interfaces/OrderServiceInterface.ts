import Order from "../order/Order";

export default interface OrderServiceInterface {
  createOrder(userId: string, cartId: string, shippingAddress: string, paymentMethod: string): Promise<Order>;
  retrieveOrderById(id: string): Promise<Order>;
  retrieveOrdersByUserId(userId: string): Promise<Order[]>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
}