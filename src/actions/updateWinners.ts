import { winners } from '../controller/winnerController';
import { WebSocket } from 'ws';

export const updateWinners = async (ws: WebSocket) => {
  const winnersFromDb = winners.getWinners();
  const result = JSON.stringify({
    type: 'update_winners',
    data: JSON.stringify(winnersFromDb),
  });
  ws.send(result);
};
