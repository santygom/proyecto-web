import express, { Application } from 'express'
import ExpressProvider from '../provider/ExpressProvider'
import ProductRouter from '../../../product/infrastructure/express/router/ProductRouter'
import UserRouter from '../../../user/infrastructure/express/router/UserRouter'
import CartRouter from '../../../cart/infrastructure/express/router/CartRouter'
import OrderRouter from '../../../order/infrastructure/express/router/OrderRouter'
import AuthRouter from '../../../auth/infrastructure/express/router/AuthRouter'

export default class Server {
  private app: Application
  private port: string

  constructor() {
    this.app = express()
    this.port = ExpressProvider.getPort()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))

    // CORS
    this.app.use((_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
      if (_req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
        return res.status(200).json({})
      }
      next()
    })
  }

  private routes(): void {
    // Rutas base para cada módulo
    this.app.use('/api/products', new ProductRouter().getRouter())
    this.app.use('/api/users', new UserRouter().getRouter())
    this.app.use('/api/cart', new CartRouter().getRouter())
    this.app.use('/api/orders', new OrderRouter().getRouter())
    this.app.use('/api/auth', new AuthRouter().getRouter())

    // Ruta base
    this.app.get('/', (_req, res) => {
      res.send('Buena Vida API - Hexagonal Architecture')
    })
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server running at ${ExpressProvider.getAPIDomain()}`)
    })
  }
}