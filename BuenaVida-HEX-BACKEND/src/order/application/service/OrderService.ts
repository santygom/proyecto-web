import Order from "../../domain/order/Order";
import NullOrder from "../../domain/order/NullOrder";
import OrderItem from "../../domain/orderItem/OrderItem";
import OrderServiceInterface from "../../domain/interfaces/OrderServiceInterface";
import OrderRepositoryPort from "../../domain/port/driven/OrderRepositoryPort";
import CartServiceInterface from "../../../cart/domain/interfaces/CartServiceInterface";
import ProductServiceInterface from "../../../product/domain/interfaces/ProductServiceInterface";

export default class OrderService implements OrderServiceInterface {
  constructor(
    private readonly orderRepository: OrderRepositoryPort,
    private readonly cartService: CartServiceInterface,
    private readonly productService: ProductServiceInterface
  ) {}

  public async createOrder(
    userId: string,
    cartId: string,
    shippingAddress: string,
    paymentMethod: string
  ): Promise<Order> {
    // Obtener el carrito actual del usuario
    const cart = await this.cartService.retrieveCartByUserId(userId);

    if (cart.isNull() || cart.getItems().length === 0) {
      throw new Error("Cannot create an order with an empty cart");
    }

    // Verificar stock disponible para todos los items
    for (const cartItem of cart.getItems()) {
      const product = cartItem.getProduct();
      if (product.getStock() < cartItem.getQuantity()) {
        throw new Error(`Not enough stock for product: ${product.getName()}`);
      }
    }

    // Crear items de la orden a partir de los items del carrito
    const orderItems = cart.getItems().map(cartItem => {
      const product = cartItem.getProduct();
      return new OrderItem({
        id: "",
        orderId: "",
        product: product,
        quantity: cartItem.getQuantity(),
        price: product.getFinalPrice(),
        subtotal: cartItem.getSubtotal()
      });
    });

    // Crear la orden
    const newOrder = new Order({
      id: "",
      userId,
      items: orderItems,
      total: cart.getTotal(),
      status: "pending",
      shippingAddress,
      paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Guardar la orden
    const savedOrder = await this.orderRepository.save(newOrder);

    // Limpiar el carrito del usuario
    await this.cartService.clearCart(userId);

    return savedOrder;
  }

  public async retrieveOrderById(id: string): Promise<Order> {
    try {
      return await this.orderRepository.findById(id);
    } catch (error) {
      return new NullOrder();
    }
  }

  public async retrieveOrdersByUserId(userId: string): Promise<Order[]> {
    return await this.orderRepository.findByUserId(userId);
  }

  public async updateOrderStatus(id: string, status: string): Promise<Order> {
    return await this.orderRepository.updateStatus(id, status);
  }
}