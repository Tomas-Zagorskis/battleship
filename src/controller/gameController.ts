import { startGame, turn } from '../actions';
import { Game, Player, StartGame, WebSocketExt } from '../types/type';

class GameController {
  private games: Game[] = [];

  createGame(game: StartGame, ws: WebSocketExt) {
    const { gameId, indexPlayer, ships } = game;
    const player: Player = { indexPlayer, ships, ws };
    const currentGame = this.getGame(gameId);

    if (currentGame) {
      currentGame.players.push(player);
      startGame(currentGame);
      turn(currentGame.players[0]!.ws);
    } else {
      const newGame: Game = { gameId, players: [player] };
      this.games.push(newGame);
    }
  }

  getGame(id: number) {
    return this.games.find((game) => game.gameId === id);
  }
}

export const games = new GameController();
