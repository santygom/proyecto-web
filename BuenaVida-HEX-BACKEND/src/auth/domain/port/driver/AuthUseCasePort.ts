import User from "../../../../user/domain/user/User";
import AuthInterface from "../../api/AuthInterface";

export default interface AuthUseCasePort {
  login(auth: AuthInterface): Promise<{ user: User; token: string } | null>;
  validateToken(token: string): Promise<User | null>;
}