import { Request, Response } from 'express'
import ProductControllerExpressInterface from '../../../domain/interfaces/ProductControllerExpressInterface'
import ProductUseCasePort from '../../../domain/port/driver/ProductUseCasePort'
import ProductsToJson from './ProductsToJson'

export default class ProductController implements ProductControllerExpressInterface {
  constructor(private readonly productUseCase: ProductUseCasePort) {}

  getProducts(_req: Request, res: Response): void {
    this.productUseCase.getProducts()
      .then(products => {
        const products_json = ProductsToJson.get(products)

        if (products_json.length === 0) {
          res.status(404).send('Products not found')
          return
        }

        res.status(200).json(products_json)
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }

  getProductById(req: Request, res: Response): void {
    const id = req.params.id
    this.productUseCase.getProductById(id)
      .then(product => {
        if (product.isNull()) {
          res.status(404).send('Product not found')
          return
        }

        const product_json = ProductsToJson.getSingle(product)
        res.status(200).json(product_json)
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }

  getProductsByCategory(req: Request, res: Response): void {
    const categoryId = req.params.categoryId
    this.productUseCase.getProductsByCategory(categoryId)
      .then(products => {
        const products_json = ProductsToJson.get(products)

        if (products_json.length === 0) {
          res.status(404).send('Products not found in this category')
          return
        }

        res.status(200).json(products_json)
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }

  getProductsInPromotion(_req: Request, res: Response): void {
    this.productUseCase.getProductsInPromotion()
      .then(products => {
        const products_json = ProductsToJson.get(products)

        if (products_json.length === 0) {
          res.status(404).send('No products in promotion found')
          return
        }

        res.status(200).json(products_json)
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }

  searchProducts(req: Request, res: Response): void {
    const term = req.query.term as string
    if (!term) {
      res.status(400).json({ error: 'Search term is required' })
      return
    }

    this.productUseCase.searchProducts(term)
      .then(products => {
        const products_json = ProductsToJson.get(products)

        if (products_json.length === 0) {
          res.status(404).send('No products found for your search')
          return
        }

        res.status(200).json(products_json)
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
  }
}