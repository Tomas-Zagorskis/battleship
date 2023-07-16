import { startGame, turn } from '../actions';
import {
  Attack,
  BoardInfo,
  Game,
  Player,
  Position,
  Ship,
  ShotType,
  StartGame,
  WebSocketExt,
} from '../types/type';

class GameController {
  private games: Game[] = [];
  private gameBoards = new Map<number, BoardInfo>();

  createGame(game: StartGame, ws: WebSocketExt) {
    const { gameId, indexPlayer, ships } = game;
    const player: Player = { indexPlayer, ships, ws };
    const currentGame = this.getGame(gameId);
    this.createGameBoard(indexPlayer, ships);
    if (currentGame) {
      currentGame.players.push(player);
      startGame(currentGame);
      turn(currentGame, currentGame.players[0]!.indexPlayer);
    } else {
      const newGame: Game = { gameId, players: [player] };
      this.games.push(newGame);
    }
  }

  getGame(id: number) {
    return this.games.find((game) => game.gameId === id);
  }

  attack(attack: Attack): null | ShotType {
    const game = this.getGame(attack.gameId);
    if (!game) return null;

    const opponent = game.players.find(
      (player) => player.indexPlayer !== attack.indexPlayer,
    );
    if (!opponent) return null;

    const opponentBoard = this.gameBoards.get(opponent.indexPlayer);
    if (!opponentBoard) return null;

    const shot: Position = { x: attack.x, y: attack.y };
    const ship = opponentBoard.occupiedCoordMap.get(shot);
    console.log(shot);

    console.log(opponentBoard.occupiedCoordMap);

    if (!ship) return 'miss';

    let live = opponentBoard.shipHealths.get(ship);
    if (!live) return null;

    live--;
    if (live === 0) return 'killed';

    return 'shot';
  }

  private createGameBoard(playerId: number, ships: Ship[]) {
    const occupiedCoordMap = new Map<Position, Ship>();
    const shipHealths = new Map<Ship, number>();

    ships.forEach((ship) => {
      let x = ship.position.x;
      let y = ship.position.y;
      shipHealths.set(ship, ship.length);
      if (ship.direction) {
        // increase y position
        const yLength = y + ship.length;
        for (; y < yLength; y++) {
          occupiedCoordMap.set({ x, y }, ship);
        }
      } else {
        // increase x position
        const xLength = x + ship.length;
        for (; x < xLength; x++) {
          occupiedCoordMap.set({ x, y }, ship);
        }
      }
    });
    this.gameBoards.set(playerId, {
      occupiedCoordMap,
      shipHealths,
      totalHealth: 20,
    });
  }
}

export const games = new GameController();
