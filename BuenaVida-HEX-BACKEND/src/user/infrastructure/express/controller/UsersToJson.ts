import User from "../../../domain/user/User";

export default class UsersToJson {
  public static get(users: User[]): any[] {
    return users.map(user => {
      if (user.isNull()) {
        return null;
      }

      return {
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        role: user.getRole()
      };
    }).filter(user => user !== null);
  }

  public static getSingle(user: User): any {
    if (user.isNull()) {
      return null;
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    };
  }
}