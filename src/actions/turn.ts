import { Game, GameInput } from '../types/type';

export const turn = (game: Game, playerId: number) => {
  const result = JSON.stringify({
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: playerId,
    }),
    id: 0,
  } as GameInput);

  game.players.forEach((player) => {
    player.ws.send(result);
  });
};
