import AbstractOrderItem, { OrderItemInterface } from './AbstractOrderItem';

export default class OrderItem extends AbstractOrderItem {
  constructor(orderItemInterface: OrderItemInterface) {
    super(orderItemInterface);
  }

  public isNull = (): boolean => false;
}