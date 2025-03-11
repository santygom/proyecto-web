import AbstractProduct from "../../../product/domain/product/AbstractProduct";

export default abstract class AbstractCartItem {
  protected id: string;
  protected product: AbstractProduct;
  protected quantity: number;

  constructor(cartItemInterface: CartItemInterface) {
    this.id = cartItemInterface.id;
    this.product = cartItemInterface.product;
    this.quantity = cartItemInterface.quantity;
  }

  public abstract isNull(): boolean;

  public getId = (): string => this.id;
  public getProduct = (): AbstractProduct => this.product;
  public getQuantity = (): number => this.quantity;
  public setQuantity = (quantity: number): void => {
    this.quantity = quantity;
  }

  public getSubtotal = (): number => {
    return this.product.getFinalPrice() * this.quantity;
  }
}

export interface CartItemInterface {
  id: string;
  product: AbstractProduct;
  quantity: number;
}