import { users } from '../controller/userController';
import { Game } from '../types/type';
import { updateWinners } from './updateWinners';

export const finish = (game: Game, winPlayer: number) => {
  const respond = JSON.stringify({
    type: 'finish',
    data: JSON.stringify({
      winPlayer,
    }),
    id: 0,
  });
  users.addWin(winPlayer);
  game.players.forEach((player) => player.ws.send(respond));
  updateWinners();
};
