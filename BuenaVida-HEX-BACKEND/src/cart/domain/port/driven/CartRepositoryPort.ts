import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import Cart from "../../cart/Cart";
import CartItem from "../../cartItem/CartItem";

export default interface CartRepositoryPort extends RepositoryInterface<string, Cart> {
  findByUserId(userId: string): Promise<Cart>;
  addItem(cartId: string, item: CartItem): Promise<Cart>;
  removeItem(cartId: string, itemId: string): Promise<Cart>;
  updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart>;
  clearItems(cartId: string): Promise<Cart>;
}