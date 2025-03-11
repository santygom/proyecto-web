import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import Order from "../../order/Order";

export default interface OrderRepositoryPort extends RepositoryInterface<string, Order> {
  findByUserId(userId: string): Promise<Order[]>;
  updateStatus(id: string, status: string): Promise<Order>;
}