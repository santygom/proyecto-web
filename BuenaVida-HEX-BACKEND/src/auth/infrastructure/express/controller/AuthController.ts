import { Request, Response } from "express";
import AuthControllerExpressInterface from "../../../domain/interfaces/AuthControllerExpressInterface";
import AuthUseCasePort from "../../../domain/port/driver/AuthUseCasePort";
import UsersToJson from "../../../../user/infrastructure/express/controller/UsersToJson";

export default class AuthController implements AuthControllerExpressInterface {
  constructor(private readonly authUseCase: AuthUseCasePort) {}

  login(req: Request, res: Response): void {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    this.authUseCase
      .login({ email, password })
      .then(result => {
        if (!result) {
          res.status(401).json({ error: "Invalid credentials" });
          return;
        }

        res.status(200).json({
          user: UsersToJson.getSingle(result.user),
          token: result.token
        });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }

  validateToken(req: Request, res: Response): void {
    // Obtiene el token del encabezado de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization token is required" });
      return;
    }

    const token = authHeader.substring(7); // Elimina 'Bearer ' del token

    this.authUseCase
      .validateToken(token)
      .then(user => {
        if (!user) {
          res.status(401).json({ error: "Invalid or expired token" });
          return;
        }

        res.status(200).json({
          user: UsersToJson.getSingle(user),
          valid: true
        });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  }
}