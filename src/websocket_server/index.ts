import { createWebSocketStream, WebSocket, WebSocketServer } from 'ws';
import { parseInput } from '../utils/responseParser';

export const webSocketServer = (port: number): WebSocketServer => {
  const wss = new WebSocketServer({ port });

  wss.on('connection', async (webSocket: WebSocket) => {
    const webSocketStream = createWebSocketStream(webSocket, {
      decodeStrings: false,
      encoding: 'utf-8',
    });

    webSocketStream.on('data', async (data: string) => {
      try {
        console.log(`<- ${data}`);
        const action = parseInput(data);

        const respond = action.handler(action.data, webSocket);
        console.log(`-> ${respond}`);
      } catch (error) {
        if (error instanceof Error) console.log(`ERROR: ${error.message}`);
        else console.log(`ERROR: ${String(error)}`);
      }
    });
  });

  return wss;
};
