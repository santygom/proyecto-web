import AbstractCartItem, { CartItemInterface } from './AbstractCartItem';

export default class CartItem extends AbstractCartItem {
  constructor(cartItemInterface: CartItemInterface) {
    super(cartItemInterface);
  }

  public isNull = (): boolean => false;
}