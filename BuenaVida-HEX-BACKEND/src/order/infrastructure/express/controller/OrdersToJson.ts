import Order from "../../../domain/order/Order";

export default class OrdersToJson {
  public static get(orders: Order[]): any[] {
    return orders
      .map(order => {
        if (order.isNull()) {
          return null;
        }

        return {
          id: order.getId(),
          userId: order.getUserId(),
          items: order.getItems().map(item => ({
            id: item.getId(),
            product: {
              id: item.getProduct().getId(),
              name: item.getProduct().getName(),
              price: item.getPrice(), // Usar el precio guardado en el pedido
              images: item.getProduct().getImages().map(image => ({
                id: image.getId(),
                url: image.getUrl(),
                alt: image.getAlt()
              }))
            },
            quantity: item.getQuantity(),
            price: item.getPrice(),
            subtotal: item.getSubtotal()
          })),
          total: order.getTotal(),
          status: order.getStatus(),
          shippingAddress: order.getShippingAddress(),
          paymentMethod: order.getPaymentMethod(),
          createdAt: order.getCreatedAt(),
          updatedAt: order.getUpdatedAt()
        };
      })
      .filter(order => order !== null);
  }

  public static getSingle(order: Order): any {
    if (order.isNull()) {
      return null;
    }

    return {
      id: order.getId(),
      userId: order.getUserId(),
      items: order.getItems().map(item => ({
        id: item.getId(),
        product: {
          id: item.getProduct().getId(),
          name: item.getProduct().getName(),
          price: item.getPrice(), // Usar el precio guardado en el pedido
          images: item.getProduct().getImages().map(image => ({
            id: image.getId(),
            url: image.getUrl(),
            alt: image.getAlt()
          }))
        },
        quantity: item.getQuantity(),
        price: item.getPrice(),
        subtotal: item.getSubtotal()
      })),
      total: order.getTotal(),
      status: order.getStatus(),
      shippingAddress: order.getShippingAddress(),
      paymentMethod: order.getPaymentMethod(),
      createdAt: order.getCreatedAt(),
      updatedAt: order.getUpdatedAt()
    };
  }
}