import {Router} from 'express'

export default interface RouterExpressInterface {
  // Define los métodos comunes para todos los routers
  router(): Router
}