import { Router } from 'express'
import ProductRouterExpressInterface from '../../../domain/interfaces/ProductRouterExpressInterface'
import ProductController from '../controller/ProductController'
import ProductUseCase from '../../../application/usecase/ProductUseCase'
import ProductService from '../../../application/service/ProductService'
import ProductRepository from '../../repository/ProductRepository'

export default class ProductRouter implements ProductRouterExpressInterface {
  private router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  private initRoutes(): void {
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)
    const productUseCase = new ProductUseCase(productService)
    const productController = new ProductController(productUseCase)

    this.router.get('/', productController.getProducts.bind(productController))
    this.router.get('/promotions', productController.getProductsInPromotion.bind(productController))
    this.router.get('/search', productController.searchProducts.bind(productController))
    this.router.get('/category/:categoryId', productController.getProductsByCategory.bind(productController))
    this.router.get('/:id', productController.getProductById.bind(productController))
  }

  public getRouter(): Router {
    return this.router
  }
}