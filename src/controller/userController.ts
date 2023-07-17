import { mockedUsers } from '../data/users';
import { User } from '../types/type';
import { winners } from './winnerController';

class UserController {
  private users: User[] = mockedUsers;

  private createNewUser(name: string, pass: string) {
    if (!validateUser(name, pass)) {
      throw new Error('Inputs must be at least 5 characters');
    }
    const newUser: User = {
      name,
      password: pass,
      index: this.users.length,
      wins: 0,
    };

    this.users.push(newUser);
    winners.addNewWinner(name);
    return newUser;
  }

  getUser(name: string, pass: string) {
    let user = this.users.find((user) => user.name === name);

    if (!user) {
      user = this.createNewUser(name, pass);
    } else if (user.password !== pass) {
      throw new Error('Wrong credentials');
    }
    return user;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.index === id);
  }

  addWin(id: number) {
    const user = this.getUserById(id);
    if (!user) return;
    user.wins++;
    winners.increaseWin(user.name);
  }
}

export const users = new UserController();

function validateUser(name: string, pass: string) {
  if (name.length > 4 && pass.length > 4) return true;
  return false;
}
