import AbstractCart, { CartInterface } from './AbstractCart';

export default class Cart extends AbstractCart {
  constructor(cartInterface: CartInterface) {
    super(cartInterface);
  }

  public isNull = (): boolean => false;
}