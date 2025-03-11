import AbstractOrderItem, { OrderItemInterface } from './AbstractOrderItem';
import NullProduct from '../../../product/domain/product/NullProduct';

export default class NullOrderItem extends AbstractOrderItem {
  constructor() {
    super({
      id: '',
      orderId: '',
      product: new NullProduct(),
      quantity: 0,
      price: 0,
      subtotal: 0
    });
  }

  public override isNull = (): boolean => true;
}