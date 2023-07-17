import { games } from '../controller/gameController';
import { StartGame, WebSocketExt } from '../types/type';

export const addShips = (ws: WebSocketExt, data: string) => {
  const playerGameData = JSON.parse(data) as StartGame;
  games.createGame(playerGameData, ws);
};
