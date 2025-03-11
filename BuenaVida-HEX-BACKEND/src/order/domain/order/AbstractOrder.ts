import AbstractOrderItem from "../orderItem/AbstractOrderItem";

export default abstract class AbstractOrder {
  protected id: string;
  protected userId: string;
  protected items: AbstractOrderItem[];
  protected total: number;
  protected status: string;
  protected shippingAddress: string;
  protected paymentMethod: string;
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(orderInterface: OrderInterface) {
    this.id = orderInterface.id;
    this.userId = orderInterface.userId;
    this.items = orderInterface.items;
    this.total = orderInterface.total;
    this.status = orderInterface.status;
    this.shippingAddress = orderInterface.shippingAddress;
    this.paymentMethod = orderInterface.paymentMethod;
    this.createdAt = orderInterface.createdAt;
    this.updatedAt = orderInterface.updatedAt;
  }

  public abstract isNull(): boolean;

  public getId = (): string => this.id;
  public getUserId = (): string => this.userId;
  public getItems = (): AbstractOrderItem[] => this.items;
  public getTotal = (): number => this.total;
  public getStatus = (): string => this.status;
  public getShippingAddress = (): string => this.shippingAddress;
  public getPaymentMethod = (): string => this.paymentMethod;
  public getCreatedAt = (): Date => this.createdAt;
  public getUpdatedAt = (): Date => this.updatedAt;

  public setStatus = (status: string): void => {
    this.status = status;
    this.updatedAt = new Date();
  };
}

export interface OrderInterface {
  id: string;
  userId: string;
  items: AbstractOrderItem[];
  total: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}