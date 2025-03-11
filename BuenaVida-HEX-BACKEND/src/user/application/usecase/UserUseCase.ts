import User from "../../domain/user/User";
import NullUser from "../../domain/user/NullUser";
import UserServiceInterface from "../../domain/interfaces/UserServiceInterface";
import UserUseCasePort from "../../domain/port/driver/UserUseCasePort";

export default class UserUseCase implements UserUseCasePort {
  constructor(private readonly userService: UserServiceInterface) {}

  public async getUsers(): Promise<User[]> {
    const users = await this.userService.retrieveUsers();

    if (users.length === 0) {
      return [new NullUser()];
    }

    return users;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userService.retrieveUserById(id);

    if (!user || user.isNull()) {
      return new NullUser();
    }

    return user;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const user = await this.userService.retrieveUserByEmail(email);

    if (!user || user.isNull()) {
      return new NullUser();
    }

    return user;
  }

  public async createUser(user: User): Promise<User> {
    return await this.userService.createUser(user);
  }

  public async updateUser(id: string, user: User): Promise<User | boolean> {
    return await this.userService.updateUser(id, user);
  }

  public async deleteUser(id: string): Promise<boolean> {
    return await this.userService.deleteUser(id);
  }
}