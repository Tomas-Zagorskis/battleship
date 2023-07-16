import { Game, GameInput } from '../types/type';

export const startGame = (game: Game) => {
  game.players.forEach((player) => {
    const result = JSON.stringify({
      type: 'start_game',
      data: JSON.stringify({
        ships: player.ships,
        currentPlayerIndex: player.indexPlayer,
      }),
      id: 0,
    } as GameInput);
    player.ws.send(result);
  });
};
