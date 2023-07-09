import { WebSocket } from 'ws';
import { rooms } from '../controller/roomController';

export const updateRoom = async (ws: WebSocket) => {
  const roomsFromDb = rooms.getRooms();
  const result = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(roomsFromDb),
    id: 0,
  });

  ws.send(result);
};
