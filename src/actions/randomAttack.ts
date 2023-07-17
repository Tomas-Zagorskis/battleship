import { games } from '../controller/gameController';
import { Attack, WebSocketExt } from '../types/type';
import { attack } from './attack';

export const randomAttack = (ws: WebSocketExt, data: string) => {
  const { gameId, indexPlayer } = JSON.parse(data);
  const x = randomCoord();
  const y = randomCoord();

  const shot: Attack = {
    gameId,
    indexPlayer,
    x,
    y,
  };

  let randomShot = games.isAvailableFire(shot);

  while (!randomShot) {
    shot.x = randomCoord();
    shot.y = randomCoord();

    randomShot = games.isAvailableFire(shot);
  }

  const req = JSON.stringify({
    gameId,
    x: shot.x,
    y: shot.y,
    indexPlayer,
  });

  attack(ws, req);
};

const randomCoord = () => {
  return Math.floor(Math.random() * 10);
};
