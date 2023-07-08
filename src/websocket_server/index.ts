import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { parseInput } from '../utils/responseParser';

export const webSocketServer = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (webSocket: WebSocket) => {
    const id = Number(Math.random().toString().split('.')[1]);
    const webSocketStream = createWebSocketStream(webSocket, {
      decodeStrings: false,
      encoding: 'utf-8',
    });

    webSocketStream.on('data', async (data: string) => {
      try {
        console.log(`<- ${data}`);
        const action = await parseInput(data);

        const respond = await action.handler(webSocket, id, action.data);
        console.log(`-> ${respond}`);
      } catch (error) {
        const err = error as Error;
        console.log(err.message);
      }
    });
  });

  return wss;
};
