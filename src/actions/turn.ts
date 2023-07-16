import { GameInput, WebSocketExt } from '../types/type';

export const turn = (ws: WebSocketExt) => {
  const result = JSON.stringify({
    type: 'turn',
    data: JSON.stringify({
      currentPlayer: ws.id,
    }),
    id: 0,
  } as GameInput);

  ws.send(result);
};
