import Cart from "../../../domain/cart/Cart";

export default class CartToJson {
  public static get(cart: Cart): any {
    if (cart.isNull()) {
      return null;
    }

    return {
      id: cart.getId(),
      userId: cart.getUserId(),
      items: cart.getItems().map(item => ({
        id: item.getId(),
        product: {
          id: item.getProduct().getId(),
          name: item.getProduct().getName(),
          price: item.getProduct().getPrice(),
          finalPrice: item.getProduct().getFinalPrice(),
          images: item.getProduct().getImages().map(image => ({
            id: image.getId(),
            url: image.getUrl(),
            alt: image.getAlt()
          }))
        },
        quantity: item.getQuantity(),
        subtotal: item.getSubtotal()
      })),
      itemCount: cart.getItemCount(),
      total: cart.getTotal(),
      createdAt: cart.getCreatedAt(),
      updatedAt: cart.getUpdatedAt()
    };
  }
}