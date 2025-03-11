import Cart from "../../domain/cart/Cart";
import NullCart from "../../domain/cart/NullCart";
import CartItem from "../../domain/cartItem/CartItem";
import CartServiceInterface from "../../domain/interfaces/CartServiceInterface";
import CartRepositoryPort from "../../domain/port/driven/CartRepositoryPort";

export default class CartService implements CartServiceInterface {
  constructor(private readonly cartRepository: CartRepositoryPort) {}

  public async retrieveCartByUserId(userId: string): Promise<Cart> {
    try {
      return await this.cartRepository.findByUserId(userId);
    } catch (error) {
      return new NullCart();
    }
  }

  public async addItem(userId: string, cartItem: CartItem): Promise<Cart> {
    const cart = await this.retrieveCartByUserId(userId);
    
    if (cart.isNull()) {
      // Si no existe un carrito, crear uno nuevo
      const newCart = new Cart({
        id: '',
        userId,
        items: [cartItem],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      return await this.cartRepository.save(newCart);
    }
    
    // Si existe el carrito, añadir el item
    return await this.cartRepository.addItem(cart.getId(), cartItem);
  }

  public async removeItem(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.retrieveCartByUserId(userId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    return await this.cartRepository.removeItem(cart.getId(), itemId);
  }

  public async updateItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.retrieveCartByUserId(userId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    return await this.cartRepository.updateItemQuantity(cart.getId(), itemId, quantity);
  }

  public async clearCart(userId: string): Promise<Cart> {
    const cart = await this.retrieveCartByUserId(userId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    return await this.cartRepository.clearItems(cart.getId());
  }
}