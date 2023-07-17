import { users } from '../controller/userController';
import { updateRoom } from './updateRoom';
import { WebSocketExt } from '../types/type';
import { updateWinners } from './updateWinners';

export const registration = (ws: WebSocketExt, data: string) => {
  let result: string;
  const { name, password } = JSON.parse(data);
  try {
    const user = users.getUser(name, password);
    ws.id = user.index;
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
    ws.send(result);
    updateRoom();
    updateWinners();
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
    ws.send(result);
  }
};
