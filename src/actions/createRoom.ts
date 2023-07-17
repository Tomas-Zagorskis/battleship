import { rooms } from '../controller/roomController';
import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';
import { WebSocketExt } from '../types/type';

export const createRoom = (ws: WebSocketExt) => {
  const user = users.getUserById(ws.id);
  if (!user) return;

  rooms.createRoom({ name: user.name, index: user.index });
  updateRoom();
};
