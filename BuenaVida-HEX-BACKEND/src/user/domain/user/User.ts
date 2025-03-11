import AbstractUser, { UserInterface } from './AbstractUser';

export default class User extends AbstractUser {
  constructor(userInterface: UserInterface) {
    super(userInterface);
  }

  public isNull = (): boolean => false;
}