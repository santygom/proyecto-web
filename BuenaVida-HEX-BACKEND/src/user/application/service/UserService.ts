import User from "../../domain/user/User";
import NullUser from "../../domain/user/NullUser";
import UserServiceInterface from "../../domain/interfaces/UserServiceInterface";
import UserRepositoryPort from "../../domain/port/driven/UserRepositoryPort";

export default class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async retrieveUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async retrieveUserById(id: string): Promise<User> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      return new NullUser();
    }
  }

  public async retrieveUserByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      return new NullUser();
    }
  }

  public async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async updateUser(id: string, user: User): Promise<User | boolean> {
    return await this.userRepository.update(id, user);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}