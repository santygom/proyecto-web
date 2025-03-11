import User from "../../../user/domain/user/User";
import UserServiceInterface from "../../../user/domain/interfaces/UserServiceInterface";
import AuthRepositoryPort from "../../domain/port/driven/AuthRepositoryPort";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import AuthInterface from "../../domain/api/AuthInterface";

export default class AuthService implements AuthServiceInterface {
  constructor(
    private readonly userService: UserServiceInterface,
    private readonly authRepository: AuthRepositoryPort
  ) {}

  public async login(auth: AuthInterface): Promise<{ user: User; token: string } | null> {
    const user = await this.userService.retrieveUserByEmail(auth.email);

    if (user.isNull()) {
      return null;
    }

    // En una aplicación real, aquí verificarías la contraseña encriptada
    if (user.getPassword() !== auth.password) {
      return null;
    }

    const token = await this.authRepository.generateToken(user.getId());
    return { user, token };
  }

  public async validateToken(token: string): Promise<User | null> {
    const userId = await this.authRepository.validateToken(token);

    if (!userId) {
      return null;
    }

    const user = await this.userService.retrieveUserById(userId);
    return user.isNull() ? null : user;
  }
}