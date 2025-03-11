import User from "../user/User";

export default interface UserServiceInterface {
  retrieveUsers(): Promise<User[]>;
  retrieveUserById(id: string): Promise<User>;
  retrieveUserByEmail(email: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(id: string, user: User): Promise<User | boolean>;
  deleteUser(id: string): Promise<boolean>;
}