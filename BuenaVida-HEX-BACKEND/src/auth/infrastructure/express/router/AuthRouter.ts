import { Router } from "express";
import AuthRouterExpressInterface from "../../../domain/interfaces/AuthRouterExpressInterface";
import AuthController from "../controller/AuthController";
import AuthUseCase from "../../../application/usecase/AuthUseCase";
import AuthService from "../../../application/service/AuthService";
import AuthRepository from "../../repository/AuthRepository";
import UserService from "../../../../user/application/service/UserService";
import UserRepository from "../../../../user/infrastructure/repository/UserRepository";

export default class AuthRouter implements AuthRouterExpressInterface {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authRepository = new AuthRepository();
    const authService = new AuthService(userService, authRepository);
    const authUseCase = new AuthUseCase(authService);
    const authController = new AuthController(authUseCase);

    this.router.post("/login", authController.login.bind(authController));
    this.router.get("/validate", authController.validateToken.bind(authController));
  }

  public getRouter(): Router {
    return this.router;
  }
}