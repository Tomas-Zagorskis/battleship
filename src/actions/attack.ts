import { games } from '../controller/gameController';
import { Attack, GameInput, WebSocketExt } from '../types/type';
import { turn } from './turn';

export const attack = (
  _ws: WebSocketExt,
  data: string,
  killShots: boolean = false,
) => {
  const attack = JSON.parse(data) as Attack;

  const game = games.getGame(attack.gameId);

  if (!game) return;
  if (attack.indexPlayer !== game.activePlayer && !killShots) return;

  const result = games.fire(attack);
  if (!result) return;

  const respond = JSON.stringify({
    type: 'attack',
    data: JSON.stringify({
      position: {
        x: attack.x,
        y: attack.y,
      },
      currentPlayer: attack.indexPlayer,
      status: result,
    }),
    id: 0,
  } as GameInput);

  game.players.forEach((player) => player.ws.send(respond));

  if (result && result === 'miss') {
    const opponent = game.players.find(
      (player) => player.indexPlayer !== attack.indexPlayer,
    );
    if (!opponent) return;
    if (!killShots) game.activePlayer = opponent.indexPlayer;
    turn(game, opponent.indexPlayer);
  } else {
    turn(game, attack.indexPlayer);
  }
};
