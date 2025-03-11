import AbstractOrder, { OrderInterface } from './AbstractOrder';

export default class NullOrder extends AbstractOrder {
  constructor() {
    super({
      id: '',
      userId: '',
      items: [],
      total: 0,
      status: '',
      shippingAddress: '',
      paymentMethod: '',
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  public override isNull = (): boolean => true;
}