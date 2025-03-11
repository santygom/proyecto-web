import Cart from "../cart/Cart";
import CartItem from "../cartItem/CartItem";

export default interface CartServiceInterface {
  retrieveCartByUserId(userId: string): Promise<Cart>;
  addItem(userId: string, cartItem: CartItem): Promise<Cart>;
  removeItem(userId: string, itemId: string): Promise<Cart>;
  updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart>;
  clearCart(userId: string): Promise<Cart>;
}