import { rooms } from '../controller/roomController';
import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';
import { createGame } from './createGame';
import { WebSocketExt } from '../types/type';

export const addUserToRoom = (ws: WebSocketExt, data: string) => {
  const { indexRoom } = JSON.parse(data);
  const user = users.getUserById(ws.id);

  if (user) {
    const fullRoom = rooms.joinToRoom(
      { name: user.name, index: user.index },
      indexRoom,
    );
    if (fullRoom) {
      createGame(fullRoom);
    }
    updateRoom();
  }
};
