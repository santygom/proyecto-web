import Product from "../../../domain/product/Product"

export default class ProductsToJson {
  public static get(products: Product[]): any[] {
    return products.map(product => {
      if (product.isNull()) {
        return null
      }

      return {
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice(),
        finalPrice: product.getFinalPrice(),
        description: product.getDescription(),
        category: {
          id: product.getCategory().getId(),
          name: product.getCategory().getName()
        },
        stock: product.getStock(),
        discount: product.getDiscount(),
        images: product.getImages().map(image => ({
          id: image.getId(),
          url: image.getUrl(),
          alt: image.getAlt()
        })),
        inPromotion: product.isInPromotion()
      }
    }).filter(product => product !== null)
  }

  public static getSingle(product: Product): any {
    if (product.isNull()) {
      return null
    }

    return {
      id: product.getId(),
      name: product.getName(),
      price: product.getPrice(),
      finalPrice: product.getFinalPrice(),
      description: product.getDescription(),
      category: {
        id: product.getCategory().getId(),
        name: product.getCategory().getName()
      },
      stock: product.getStock(),
      discount: product.getDiscount(),
      images: product.getImages().map(image => ({
        id: image.getId(),
        url: image.getUrl(),
        alt: image.getAlt()
      })),
      inPromotion: product.isInPromotion()
    }
  }
}