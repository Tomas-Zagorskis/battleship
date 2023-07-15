import { WebSocket } from 'ws';
import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';

export const registration = async (ws: WebSocket, id: number, data: string) => {
  let result: string;
  const { name, password } = await JSON.parse(data);
  try {
    const user = users.getUser(name, password, id);

    result = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: user.name,
        index: user.index,
        error: false,
        errorText: '',
      }),
      id: 0,
    });
    updateRoom();
  } catch (error) {
    const err = error as Error;

    result = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: name,
        index: 0,
        error: true,
        errorText: err.message,
      }),
      id: 0,
    });
  }
  ws.send(result);
};
