import AbstractProduct from "../../../product/domain/product/AbstractProduct";

export default interface CartInterface {
  userId: string;
  productId: string;
  quantity: number;
}