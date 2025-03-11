import Product from '../../domain/product/Product';
import NullProduct from '../../domain/product/NullProduct';
import ProductServiceInterface from '../../domain/interfaces/ProductServiceInterface';
import ProductRepositoryPort from '../../domain/port/driven/ProductRepositoryPort';

export default class ProductService implements ProductServiceInterface {
  constructor(private readonly productRepository: ProductRepositoryPort) {}

  public async retrieveProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  public async retrieveProductById(id: string): Promise<Product> {
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      return new NullProduct();
    }
  }

  public async retrieveProductsByCategory(categoryId: string): Promise<Product[]> {
    return await this.productRepository.findByCategory(categoryId);
  }

  public async retrieveProductsInPromotion(): Promise<Product[]> {
    return await this.productRepository.findProductsInPromotion();
  }

  public async searchProducts(term: string): Promise<Product[]> {
    return await this.productRepository.searchProducts(term);
  }
}