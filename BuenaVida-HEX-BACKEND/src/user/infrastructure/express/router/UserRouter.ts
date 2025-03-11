import { Router } from "express";
import UserRouterExpressInterface from "../../../domain/interfaces/UserRouterExpressInterface";
import UserController from "../controller/UserController";
import UserUseCase from "../../../application/usecase/UserUseCase";
import UserService from "../../../application/service/UserService";
import UserRepository from "../../repository/UserRepository";

export default class UserRouter implements UserRouterExpressInterface {
  private router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userUseCase = new UserUseCase(userService);
    const userController = new UserController(userUseCase);

    this.router.get("/", userController.getUsers.bind(userController));
    this.router.get("/:id", userController.getUserById.bind(userController));
    this.router.post("/", userController.createUser.bind(userController));
    this.router.put("/:id", userController.updateUser.bind(userController));
    this.router.delete("/:id", userController.deleteUser.bind(userController));
  }

  public getRouter(): Router {
    return this.router;
  }
}