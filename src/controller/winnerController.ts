import { Winner } from '../types/type';

class WinnersController {
  private winners: Winner[] = [];

  addNewWinner(name: string) {
    this.winners.push({ name, wins: 0 });
  }

  getWinners() {
    return this.winners.sort((a, b) => b.wins - a.wins);
  }

  increaseWin(name: string) {
    const winner = this.getWinner(name);
    if (winner) winner.wins++;
  }

  private getWinner(name: string) {
    return this.winners.find((winner) => winner.name === name);
  }
}

export const winners = new WinnersController();
