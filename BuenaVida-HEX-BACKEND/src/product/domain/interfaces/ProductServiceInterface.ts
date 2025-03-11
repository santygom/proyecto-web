import Product from "../product/Product"

export default interface ProductServiceInterface {
  retrieveProducts(): Promise<Product[]>
  retrieveProductById(id: string): Promise<Product>
  retrieveProductsByCategory(categoryId: string): Promise<Product[]>
  retrieveProductsInPromotion(): Promise<Product[]>
  searchProducts(term: string): Promise<Product[]>
}