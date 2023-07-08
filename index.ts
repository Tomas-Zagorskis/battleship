import { webSocketServer } from './src/websocket_server';
import { httpServer } from './src/http_server';
import 'dotenv/config.js';

const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8181;
const WS_PORT: number = Number(process.env.WS_PORT) || 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

console.log(`Start WebSocket server on the ${WS_PORT} port!`);
webSocketServer(WS_PORT);
