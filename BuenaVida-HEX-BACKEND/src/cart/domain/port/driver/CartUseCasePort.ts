import Cart from "../../cart/Cart";
import CartInterface from "../../api/CartInterface";

export default interface CartUseCasePort {
  getCart(userId: string): Promise<Cart>;
  addToCart(cartData: CartInterface): Promise<Cart>;
  removeFromCart(userId: string, itemId: string): Promise<Cart>;
  updateCartItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart>;
  clearCart(userId: string): Promise<Cart>;
}