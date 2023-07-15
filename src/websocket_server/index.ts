import { WebSocket, WebSocketServer } from 'ws';
import { parseInput } from '../utils/responseParser';

export const webSocketServer = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (webSocket: WebSocket) => {
    const id = Number(Math.random().toString().split('.')[1]);

    webSocket.on('error', console.log);

    webSocket.on('message', async (data: string) => {
      try {
        const action = await parseInput(data);
        await action.handler(webSocket, id, action.data);
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
      }
    });
  });

  return wss;
};
