import { WebSocket } from 'ws';
import { wss } from '..';
import { WebSocketExt } from '../types/type';
import { winners } from '../controller/winnerController';

export const updateWinners = () => {
  (wss.clients as Set<WebSocketExt>).forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      const winsTable = winners.getWinners();
      const result = JSON.stringify({
        type: 'update_winners',
        data: JSON.stringify(winsTable),
      });

      client.send(result);
    }
  });
};
