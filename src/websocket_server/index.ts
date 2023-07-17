import { WebSocketServer } from 'ws';
import { parseInput } from '../utils/responseParser';
import { WebSocketExt } from '../types/type';

export const webSocketServer = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (webSocket: WebSocketExt) => {
    webSocket.on('error', console.error);

    webSocket.on('message', async (data: string) => {
      try {
        const action = await parseInput(data);
        await action.handler(webSocket, action.data);
      } catch (error) {
        const err = error as Error;
        console.error(err.message);
        webSocket.send(
          JSON.stringify({
            type: 'error',
            data: err.message,
            id: 0,
          }),
        );
      }
    });
  });

  return wss;
};
