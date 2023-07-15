import { wss } from '..';
import { games } from '../controller/gameController';
import { Room, WebSocketExt } from '../types/type';

export const createGame = (room: Room) => {
  games.createGame();
  room.roomUsers.forEach((player) => {
    const result = JSON.stringify({
      type: 'create_game',
      data: JSON.stringify({
        idGame: room.roomId,
        idPlayer: player.index,
      }),
      id: 0,
    });
    (wss.clients as Set<WebSocketExt>).forEach((client) => {
      if (client.id === player.index) {
        client.send(result);
      }
    });
  });
};
