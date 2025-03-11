export default abstract class AbstractUser {
    protected id: string;
    protected name: string;
    protected email: string;
    protected password: string;
    protected role: string;
  
    constructor(userInterface: UserInterface) {
      this.id = userInterface.id;
      this.name = userInterface.name;
      this.email = userInterface.email;
      this.password = userInterface.password;
      this.role = userInterface.role;
    }
  
    public abstract isNull(): boolean;
  
    public getId = (): string => this.id;
    public getName = (): string => this.name;
    public getEmail = (): string => this.email;
    public getPassword = (): string => this.password;
    public getRole = (): string => this.role;
  }
  
  export interface UserInterface {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  }