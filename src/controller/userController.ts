import { User } from '../types/type';

class UserController {
  private users: User[] = [];

  private createNewUser(name: string, pass: string, id: number) {
    if (!validateUser(name, pass)) {
      throw new Error('Inputs must be at least 5 characters');
    }
    const newUser: User = {
      name,
      password: pass,
      index: this.users.length,
      id,
      wins: 0,
    };

    this.users.push(newUser);
    return newUser;
  }

  getUser(name: string, pass: string, id: number) {
    let user = this.users.find((user) => user.name === name);

    if (!user) {
      user = this.createNewUser(name, pass, id);
    } else if (user.password !== pass) {
      throw new Error('Wrong credentials');
    } else {
      user.id = id;
    }
    return user;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}

export const users = new UserController();

function validateUser(name: string, pass: string) {
  if (name.length > 4 && pass.length > 4) return true;
  return false;
}
