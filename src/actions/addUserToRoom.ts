import { WebSocket } from 'ws';
import { rooms } from '../controller/roomController';
import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';
import { createGame } from './createGame';

export const addUserToRoom = async (
  ws: WebSocket,
  id: number,
  data: string,
) => {
  const { indexRoom } = await JSON.parse(data);
  const user = users.getUserById(id);

  if (user) {
    rooms.joinToRoom({ name: user.name, index: user.index }, indexRoom);
    await createGame(ws, user);
    updateRoom();
  }
};
