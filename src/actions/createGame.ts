import { WebSocket } from 'ws';
import { games } from '../controller/gameController';
import { User } from '../types/type';

export const createGame = async (ws: WebSocket, user: User) => {
  games.createGame();
  const result = JSON.stringify({
    type: 'create_game',
    data: JSON.stringify({
      idGame: 0,
      idPlayer: user?.index,
    }),
    id: 0,
  });

  ws.send(result);
};
