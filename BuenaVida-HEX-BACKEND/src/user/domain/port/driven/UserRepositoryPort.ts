import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import User from "../../user/User";

export default interface UserRepositoryPort extends RepositoryInterface<string, User> {
  findByEmail(email: string): Promise<User>;
}