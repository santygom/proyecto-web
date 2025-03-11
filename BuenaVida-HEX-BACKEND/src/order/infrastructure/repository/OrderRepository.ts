import Order from "../../domain/order/Order";
import NullOrder from "../../domain/order/NullOrder";
import OrderItem from "../../domain/orderItem/OrderItem";
import OrderRepositoryPort from "../../domain/port/driven/OrderRepositoryPort";

export default class OrderRepository implements OrderRepositoryPort {
  private orders: Order[] = [];
  private nextOrderItemId: number = 1;

  constructor() {
    // Inicialización vacía, las órdenes se crean al realizar compras
  }

  public async findAll(): Promise<Order[]> {
    return this.orders;
  }

  public async findById(id: string): Promise<Order> {
    const order = this.orders.find(order => order.getId() === id);
    return order || new NullOrder();
  }

  public async findByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter(order => order.getUserId() === userId);
  }

  public async save(item: Order): Promise<Order> {
    const newId = (this.orders.length + 1).toString();
    
    // Asignar IDs a los items de la orden si no los tienen
    const updatedItems = item.getItems().map(orderItem => {
      if (!orderItem.getId()) {
        return new OrderItem({
          ...orderItem,
          id: (this.nextOrderItemId++).toString(),
          orderId: newId
        } as any);
      }
      return orderItem;
    });
    
    const newOrder = new Order({
      ...item,
      id: newId,
      items: updatedItems
    } as any);
    
    this.orders.push(newOrder);
    return newOrder;
  }

  public async update(id: string, item: Order): Promise<Order | boolean> {
    const index = this.orders.findIndex(order => order.getId() === id);
    if (index === -1) {
      return false;
    }
    
    this.orders[index] = item;
    return this.orders[index];
  }

  public async patch(id: string, item: Partial<Order>): Promise<Order | boolean> {
    const index = this.orders.findIndex(order => order.getId() === id);
    if (index === -1) {
      return false;
    }
    
    this.orders[index] = { ...this.orders[index], ...item } as Order;
    return this.orders[index];
  }

  public async delete(id: string): Promise<boolean> {
    const initialLength = this.orders.length;
    this.orders = this.orders.filter(order => order.getId() !== id);
    return this.orders.length !== initialLength;
  }

  public async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findById(id);
    
    if (order.isNull()) {
      return order;
    }
    
    order.setStatus(status);
    await this.update(id, order);
    
    return order;
  }
}