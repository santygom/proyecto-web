import AbstractCartItem from "../cartItem/AbstractCartItem";

export default abstract class AbstractCart {
  protected id: string;
  protected userId: string;
  protected items: AbstractCartItem[];
  protected createdAt: Date;
  protected updatedAt: Date;

  constructor(cartInterface: CartInterface) {
    this.id = cartInterface.id;
    this.userId = cartInterface.userId;
    this.items = cartInterface.items;
    this.createdAt = cartInterface.createdAt;
    this.updatedAt = cartInterface.updatedAt;
  }

  public abstract isNull(): boolean;

  public getId = (): string => this.id;
  public getUserId = (): string => this.userId;
  public getItems = (): AbstractCartItem[] => this.items;
  public getCreatedAt = (): Date => this.createdAt;
  public getUpdatedAt = (): Date => this.updatedAt;

  public getTotal = (): number => {
    return this.items.reduce((total, item) => total + item.getSubtotal(), 0);
  }

  public getItemCount = (): number => {
    return this.items.reduce((count, item) => count + item.getQuantity(), 0);
  }

  public addItem = (item: AbstractCartItem): void => {
    // Buscar si el producto ya está en el carrito
    const existingItemIndex = this.items.findIndex(
        i => i.getProduct().getId() === item.getProduct().getId()
    );
    if (existingItemIndex !== -1) {
        // Si ya existe, obtener el item
        const existingItem = this.items[existingItemIndex];
        if (existingItem) {
            // Aumentar la cantidad
            existingItem.setQuantity(existingItem.getQuantity() + item.getQuantity());
        }
    } else {
        // Si no existe, añadir nuevo item
        this.items.push(item);
    }
    this.updatedAt = new Date();
};


  public removeItem = (itemId: string): boolean => {
    const initialLength = this.items.length;
    this.items = this.items.filter(item => item.getId() !== itemId);
    this.updatedAt = new Date();
    return this.items.length !== initialLength;
  }

  public clearItems = (): void => {
    this.items = [];
    this.updatedAt = new Date();
  }

  public updateItemQuantity = (itemId: string, quantity: number): boolean => {
    const item = this.items.find(item => item.getId() === itemId);
    
    if (!item) {
      return false;
    }

    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    item.setQuantity(quantity);
    this.updatedAt = new Date();
    return true;
  }
}

export interface CartInterface {
  id: string;
  userId: string;
  items: AbstractCartItem[];
  createdAt: Date;
  updatedAt: Date;
}