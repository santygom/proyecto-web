import AbstractCartItem, { CartItemInterface } from './AbstractCartItem';
import NullProduct from '../../../product/domain/product/NullProduct';

export default class NullCartItem extends AbstractCartItem {
  constructor() {
    super({
      id: '',
      product: new NullProduct(),
      quantity: 0
    });
  }

  public override isNull = (): boolean => true;
}