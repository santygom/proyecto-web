import AbstractProduct, { ProductInterface } from './AbstractProduct'
import NullCategory from '../category/NullCategory'
import NullImage from '../image/NullImage'

export default class NullProduct extends AbstractProduct {
  constructor() {
    super({
      id: '',
      name: 'Product not found',
      price: 0,
      description: '',
      category: new NullCategory(),
      stock: 0,
      discount: 0,
      images: [new NullImage()],
      inPromotion: false
    })
  }

  public override isNull = (): boolean => true
}