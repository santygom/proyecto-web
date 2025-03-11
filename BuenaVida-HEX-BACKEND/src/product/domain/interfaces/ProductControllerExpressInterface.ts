import { Request, Response } from 'express'

export default interface ProductControllerExpressInterface {
  getProducts(req: Request, res: Response): void
  getProductById(req: Request, res: Response): void
  getProductsByCategory(req: Request, res: Response): void
  getProductsInPromotion(req: Request, res: Response): void
  searchProducts(req: Request, res: Response): void
}