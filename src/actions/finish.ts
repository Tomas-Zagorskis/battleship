import { Game } from '../types/type';

export const finish = (game: Game, winPlayer: number) => {
  const respond = JSON.stringify({
    type: 'finish',
    data: JSON.stringify({
      winPlayer,
    }),
    id: 0,
  });
  game.players.forEach((player) => player.ws.send(respond));
};
