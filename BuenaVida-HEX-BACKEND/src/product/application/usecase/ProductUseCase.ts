import Product from '../../domain/product/Product'
import NullProduct from '../../domain/product/NullProduct'
import ProductServiceInterface from '../../domain/interfaces/ProductServiceInterface'
import ProductUseCasePort from '../../domain/port/driver/ProductUseCasePort'

export default class ProductUseCase implements ProductUseCasePort {
  constructor(private readonly productService: ProductServiceInterface) {}
  
  public async getProducts(): Promise<Product[]> {
    const products = await this.productService.retrieveProducts()

    if (products.length === 0) {
      return [new NullProduct()]
    }

    return products
  }

  public async getProductById(id: string): Promise<Product> {
    const product = await this.productService.retrieveProductById(id)
    
    if (!product || product.isNull()) {
      return new NullProduct()
    }

    return product
  }

  public async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productService.retrieveProductsByCategory(categoryId)

    if (products.length === 0) {
      return [new NullProduct()]
    }

    return products
  }

  public async getProductsInPromotion(): Promise<Product[]> {
    const products = await this.productService.retrieveProductsInPromotion()

    if (products.length === 0) {
      return [new NullProduct()]
    }

    return products
  }

  public async searchProducts(term: string): Promise<Product[]> {
    const products = await this.productService.searchProducts(term)

    if (products.length === 0) {
      return [new NullProduct()]
    }

    return products
  }
}