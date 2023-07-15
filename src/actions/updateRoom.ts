import { WebSocket } from 'ws';
import { rooms } from '../controller/roomController';
import { wss } from '..';

export const updateRoom = () => {
  const roomsFromDb = rooms.getRooms();
  const result = JSON.stringify({
    type: 'update_room',
    data: JSON.stringify(roomsFromDb),
    id: 0,
  });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(result);
    }
  });
};
