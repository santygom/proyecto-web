import AbstractOrder, { OrderInterface } from './AbstractOrder';

export default class Order extends AbstractOrder {
  constructor(orderInterface: OrderInterface) {
    super(orderInterface);
  }

  public isNull = (): boolean => false;
}