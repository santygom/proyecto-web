import Cart from "../../domain/cart/Cart";
import NullCart from "../../domain/cart/NullCart";
import CartItem from "../../domain/cartItem/CartItem";
import CartInterface from "../../domain/api/CartInterface";
import CartServiceInterface from "../../domain/interfaces/CartServiceInterface";
import CartUseCasePort from "../../domain/port/driver/CartUseCasePort";
import ProductServiceInterface from "../../../product/domain/interfaces/ProductServiceInterface";

export default class CartUseCase implements CartUseCasePort {
  constructor(
    private readonly cartService: CartServiceInterface,
    private readonly productService: ProductServiceInterface
  ) {}

  public async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartService.retrieveCartByUserId(userId);
    return cart;
  }

  public async addToCart(cartData: CartInterface): Promise<Cart> {
    const { userId, productId, quantity } = cartData;
    
    // Validar que el producto existe
    const product = await this.productService.retrieveProductById(productId);
    
    if (product.isNull()) {
      return new NullCart();
    }
    
    // Validar que hay suficiente stock
    if (product.getStock() < quantity) {
      throw new Error(`Not enough stock. Available: ${product.getStock()}`);
    }
    
    // Crear un nuevo item para el carrito
    const cartItem = new CartItem({
      id: '', // El ID se generará en el repositorio
      product,
      quantity
    });
    
    return await this.cartService.addItem(userId, cartItem);
  }

  public async removeFromCart(userId: string, itemId: string): Promise<Cart> {
    return await this.cartService.removeItem(userId, itemId);
  }

  public async updateCartItemQuantity(userId: string, itemId: string, quantity: number): Promise<Cart> {
    if (quantity <= 0) {
      return await this.removeFromCart(userId, itemId);
    }
    
    return await this.cartService.updateItemQuantity(userId, itemId, quantity);
  }

  public async clearCart(userId: string): Promise<Cart> {
    return await this.cartService.clearCart(userId);
  }
}