import AbstractProduct, { ProductInterface } from './AbstractProduct'

export default class Product extends AbstractProduct {
  constructor(productInterface: ProductInterface) {
    super(productInterface)
  }

  public isNull = (): boolean => false
}