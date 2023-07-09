import { Winner } from '../types/type';

class WinnersController {
  private winners: Winner[] = [];

  getWinner(name: string) {
    return this.winners.find((winner) => winner.name === name);
  }

  getWinners() {
    return this.winners;
  }

  updateWin(name: string) {
    const winner = this.getWinner(name);
    if (winner) {
      winner.wins++;
    } else {
      this.winners.push({ name, wins: 1 });
    }
  }
}

export const winners = new WinnersController();
