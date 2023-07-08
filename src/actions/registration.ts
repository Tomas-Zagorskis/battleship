import { WebSocket } from 'ws';
import { Users } from '../controller/userController';

export const registration = async (data: string, ws: WebSocket) => {
  let result: string;
  try {
    const { name, password } = await JSON.parse(data);
    const user = Users.getUser(name, password);
    (result = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: user.name,
        index: user.index,
        error: false,
        errorText: '',
      }),
    })),
      ws.send(result);
    return result;
  } catch (error) {
    const err = error as Error;
    (result = JSON.stringify({
      type: 'reg',
      data: JSON.stringify({
        name: '',
        index: 0,
        error: true,
        errorText: err.message,
      }),
    })),
      ws.send(result);
    return result;
  }
};
