import { WebSocket } from 'ws';
import { rooms } from '../controller/roomController';
import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';

export const createRoom = (_ws: WebSocket, id: number) => {
  const user = users.getUserById(id);
  rooms.createRoom({ name: user!.name, index: user!.index });
  updateRoom();
};
