import Cart from "../../domain/cart/Cart";
import NullCart from "../../domain/cart/NullCart";
import CartItem from "../../domain/cartItem/CartItem";
import CartRepositoryPort from "../../domain/port/driven/CartRepositoryPort";

export default class CartRepository implements CartRepositoryPort {
  private carts: Cart[] = [];
  private nextItemId: number = 1;

  constructor() {
    // Inicialización vacía, los carritos se crean al agregar items
  }

  public async findAll(): Promise<Cart[]> {
    return this.carts;
  }

  public async findById(id: string): Promise<Cart> {
    const cart = this.carts.find(cart => cart.getId() === id);
    return cart || new NullCart();
  }

  public async findByUserId(userId: string): Promise<Cart> {
    const cart = this.carts.find(cart => cart.getUserId() === userId);
    return cart || new NullCart();
  }

  public async save(item: Cart): Promise<Cart> {
    const newId = (this.carts.length + 1).toString();
    
    // Asignar IDs a los items del carrito si no los tienen
    const updatedItems = item.getItems().map(cartItem => {
      if (!cartItem.getId()) {
        return new CartItem({
          ...cartItem,
          id: this.nextItemId++,toString(){}
        } as any);
      }
      return cartItem;
    });
    
    const newCart = new Cart({
      ...item,
      id: newId,
      items: updatedItems
    } as any);
    
    this.carts.push(newCart);
    return newCart;
  }

  public async update(id: string, item: Cart): Promise<Cart | boolean> {
    const index = this.carts.findIndex(cart => cart.getId() === id);
    if (index === -1) {
      return false;
    }
    
    this.carts[index] = item;
    return this.carts[index];
  }

  public async patch(id: string, item: Partial<Cart>): Promise<Cart | boolean> {
    const index = this.carts.findIndex(cart => cart.getId() === id);
    if (index === -1 || !this.carts[index]) {
        return false;
    }
    this.carts[index] = { ...this.carts[index], ...item } as Cart;
    return this.carts[index];
}


  public async delete(id: string): Promise<boolean> {
    const initialLength = this.carts.length;
    this.carts = this.carts.filter(cart => cart.getId() !== id);
    return this.carts.length !== initialLength;
  }

  public async addItem(cartId: string, item: CartItem): Promise<Cart> {
    const cart = await this.findById(cartId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    // Asignar ID al nuevo item si no lo tiene
    if (!item.getId()) {
      item = new CartItem({
        ...item,
        id: this.nextItemId++,toString(){}
      } as any);
    }
    
    // Añadir item al carrito
    cart.addItem(item);
    
    // Actualizar el carrito en la base de datos
    await this.update(cartId, cart);
    
    return cart;
  }

  public async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const cart = await this.findById(cartId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    // Eliminar item del carrito
    cart.removeItem(itemId);
    
    // Actualizar el carrito en la base de datos
    await this.update(cartId, cart);
    
    return cart;
  }

  public async updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart> {
    const cart = await this.findById(cartId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    // Actualizar cantidad del item
    cart.updateItemQuantity(itemId, quantity);
    
    // Actualizar el carrito en la base de datos
    await this.update(cartId, cart);
    
    return cart;
  }

  public async clearItems(cartId: string): Promise<Cart> {
    const cart = await this.findById(cartId);
    
    if (cart.isNull()) {
      return cart;
    }
    
    // Vaciar el carrito
    cart.clearItems();
    
    // Actualizar el carrito en la base de datos
    await this.update(cartId, cart);
    
    return cart;
  }
}