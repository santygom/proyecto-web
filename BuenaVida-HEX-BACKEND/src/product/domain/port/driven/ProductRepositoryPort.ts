import RepositoryInterface from '../../../../repository/domain/RepositoryInterface'
import Product from '../../product/Product'

export default interface ProductRepositoryPort
  extends RepositoryInterface<string, Product> {
  findByCategory(categoryId: string): Promise<Product[]>
  findProductsInPromotion(): Promise<Product[]>
  searchProducts(term: string): Promise<Product[]>
}