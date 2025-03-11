import User from "../../domain/user/User";
import NullUser from "../../domain/user/NullUser";
import UserRepositoryPort from "../../domain/port/driven/UserRepositoryPort";

export default class UserRepository implements UserRepositoryPort {
  private users: User[] = [];

  constructor() {
    // Inicializamos con algunos usuarios de ejemplo
    this.initSampleUsers();
  }

  private initSampleUsers(): void {
    this.users = [
      new User({
        id: "1",
        name: "Admin User",
        email: "admin@buenavida.com",
        password: "admin123", // En una aplicación real, esto estaría encriptado
        role: "admin"
      }),
      new User({
        id: "2",
        name: "Customer User",
        email: "customer@example.com",
        password: "customer123",
        role: "customer"
      })
    ];
  }

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.getId() === id);
    return user || new NullUser();
  }

  public async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.getEmail() === email);
    return user || new NullUser();
  }

  public async save(item: User): Promise<User> {
    const newId = (this.users.length + 1).toString();
    const newUser = new User({
      ...item,
      id: newId
    } as any);

    this.users.push(newUser);
    return newUser;
  }

  public async update(id: string, item: User): Promise<User | boolean> {
    const index = this.users.findIndex(user => user.getId() === id);
    if (index === -1) {
      return false;
    }

    this.users[index] = item;
    return this.users[index];
  }

  public async patch(id: string, item: Partial<User>): Promise<User | boolean> {
    const index = this.users.findIndex(user => user.getId() === id);
    if (index === -1) {
        return false;
    }
    if (!this.users[index]) {
        return false;
    }
    this.users[index] = { ...this.users[index]!, ...item } as User;
    return this.users[index]!;
}

  public async delete(id: string): Promise<boolean> {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.getId() !== id);
    return this.users.length !== initialLength;
  }
}