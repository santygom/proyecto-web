import { Request, Response } from 'express'

export default interface ControllerExpressInterface {
  // Define los métodos comunes para todos los controladores
  handle(req: Request, res: Response): void
}