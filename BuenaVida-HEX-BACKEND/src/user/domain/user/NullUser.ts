import AbstractUser, { UserInterface } from './AbstractUser';

export default class NullUser extends AbstractUser {
  constructor() {
    super({
      id: '',
      name: 'User not found',
      email: '',
      password: '',
      role: ''
    });
  }

  public override isNull = (): boolean => true;
}