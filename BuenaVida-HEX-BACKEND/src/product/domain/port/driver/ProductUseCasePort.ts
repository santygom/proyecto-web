import Product from '../../product/Product'

export default interface ProductUseCasePort {
  getProducts(): Promise<Product[]>
  getProductById(id: string): Promise<Product>
  getProductsByCategory(categoryId: string): Promise<Product[]>
  getProductsInPromotion(): Promise<Product[]>
  searchProducts(term: string): Promise<Product[]>
}