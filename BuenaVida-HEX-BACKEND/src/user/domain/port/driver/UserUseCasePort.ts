import User from "../../user/User";

export default interface UserUseCasePort {
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(id: string, user: User): Promise<User | boolean>;
  deleteUser(id: string): Promise<boolean>;
}