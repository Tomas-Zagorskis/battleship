import { webSocketServer } from './websocket_server';
import { httpServer } from './http_server';
import 'dotenv/config.js';

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT: number = Number(process.env.WS_PORT) || 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start WebSocket server on the ${WS_PORT} port!`);
const wss = webSocketServer(WS_PORT);

process.on('SIGINT', () => {
  console.log('Shutting down http and websocket servers!');
  wss.close();
  wss.clients.forEach((client) => {
    client.close();
  });
  httpServer.close();
  httpServer.closeAllConnections();
  process.exit();
});
