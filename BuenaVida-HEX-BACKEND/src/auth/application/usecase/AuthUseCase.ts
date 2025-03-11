import User from "../../../user/domain/user/User";
import AuthInterface from "../../domain/api/AuthInterface";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import AuthUseCasePort from "../../domain/port/driver/AuthUseCasePort";

export default class AuthUseCase implements AuthUseCasePort {
  constructor(private readonly authService: AuthServiceInterface) {}

  public async login(auth: AuthInterface): Promise<{ user: User; token: string } | null> {
    return await this.authService.login(auth);
  }

  public async validateToken(token: string): Promise<User | null> {
    return await this.authService.validateToken(token);
  }
}