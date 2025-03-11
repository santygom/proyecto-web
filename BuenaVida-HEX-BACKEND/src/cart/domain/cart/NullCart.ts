import AbstractCart, { CartInterface } from './AbstractCart';

export default class NullCart extends AbstractCart {
  constructor() {
    super({
      id: '',
      userId: '',
      items: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  public override isNull = (): boolean => true;
}