import AbstractProduct from "../../../product/domain/product/AbstractProduct";

export default abstract class AbstractOrderItem {
  protected id: string;
  protected orderId: string;
  protected product: AbstractProduct;
  protected quantity: number;
  protected price: number;
  protected subtotal: number;

  constructor(orderItemInterface: OrderItemInterface) {
    this.id = orderItemInterface.id;
    this.orderId = orderItemInterface.orderId;
    this.product = orderItemInterface.product;
    this.quantity = orderItemInterface.quantity;
    this.price = orderItemInterface.price;
    this.subtotal = orderItemInterface.subtotal;
  }

  public abstract isNull(): boolean;

  public getId = (): string => this.id;
  public getOrderId = (): string => this.orderId;
  public getProduct = (): AbstractProduct => this.product;
  public getQuantity = (): number => this.quantity;
  public getPrice = (): number => this.price;
  public getSubtotal = (): number => this.subtotal;
}

export interface OrderItemInterface {
  id: string;
  orderId: string;
  product: AbstractProduct;
  quantity: number;
  price: number;
  subtotal: number;
}