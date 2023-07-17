import { startGame, turn, attack, finish } from '../actions';
import {
  Attack,
  BoardInfo,
  Game,
  Player,
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

  fire(attack: Attack): null | ShotType {
    const game = this.getGame(attack.gameId);
    if (!game) return null;

    const opponent = game.players.find(
      (player) => player.indexPlayer !== attack.indexPlayer,
    );
    if (!opponent) return null;

    const opponentBoard = this.gameBoards.get(opponent.indexPlayer);
    if (!opponentBoard) return null;

    const xLine = opponentBoard.boardXY.get(attack.y);
    if (!xLine) return null;
    const ship = xLine.get(attack.x);

    if (ship === undefined) return null;

    // 0 - empty space
    // 1 - missed shot space
    // 2 - hit ship space
    // 3 - killed ship space
    if (ship === 0) {
      xLine.set(attack.x, 1);
      return 'miss';
    } else if (ship === 1) {
      return null;
    } else if (ship === 2) {
      xLine.set(attack.x, 3);
      return 'killed';
    } else if (ship === 3) {
      return null;
    }

    let live = opponentBoard.shipHealths.get(ship as Ship);
    let totalLive = opponentBoard.totalHealth;
    if (!live) return null;
    live--;
    totalLive--;
    opponentBoard.shipHealths.set(ship as Ship, live);
    opponentBoard.totalHealth = totalLive;
    if (live === 0) {
      xLine.set(attack.x, 3);
      this.killShip(ship as Ship, game.gameId, attack.indexPlayer, opponent.ws);
      if (totalLive === 0) {
        finish(game, attack.indexPlayer);
      }
      return 'killed';
    }
    xLine.set(attack.x, 2);
    return 'shot';
  }

  isAvailableFire(attack: Attack) {
    const game = this.getGame(attack.gameId);
    if (!game) return false;

    const opponent = game.players.find(
      (player) => player.indexPlayer !== attack.indexPlayer,
    );
    if (!opponent) return false;

    const opponentBoard = this.gameBoards.get(opponent.indexPlayer);
    if (!opponentBoard) return false;

    const xLine = opponentBoard.boardXY.get(attack.y);
    if (!xLine) return false;
    const ship = xLine.get(attack.x);
    if (ship === undefined) return false;
    if (ship === 0 || typeof ship !== 'number') {
      return true;
    }

    return false;
  }

  private createGameBoard(playerId: number, ships: Ship[]) {
    const boardXY = this.emptyBoard();
    const shipHealths = new Map<Ship, number>();

    ships.forEach((ship) => {
      let x = ship.position.x;
      let y = ship.position.y;
      shipHealths.set(ship, ship.length);

      if (ship.direction) {
        // increase y position
        const yLength = y + ship.length;
        for (; y < yLength; y++) {
          let row = boardXY.get(y);
          row!.set(x, ship);
        }
      } else {
        // increase x position
        const xLength = x + ship.length;
        let row = boardXY.get(y);
        for (; x < xLength; x++) {
          row!.set(x, ship);
        }
      }
    });

    this.gameBoards.set(playerId, {
      boardXY,
      shipHealths,
      totalHealth: 20,
    });
  }

  private emptyBoard() {
    const boardXY = new Map<number, Map<number, Ship | number>>();

    for (let y = 0; y < 10; y++) {
      const row = new Map<number, Ship | number>();
      for (let x = 0; x < 10; x++) {
        row.set(x, 0);
      }
      boardXY.set(y, row);
    }

    return boardXY;
  }

  private killShip(
    ship: Ship,
    gameId: number,
    indexPlayer: number,
    ws: WebSocketExt,
  ) {
    const shipX = ship.position.x;
    const shipY = ship.position.y;

    let x = shipX < 1 ? shipX : shipX - 1;
    let y = shipY < 1 ? shipY : shipY - 1;

    if (ship.direction) {
      // vertical ship
      const shipWidth = shipX === 0 || shipX === 9 ? x + 2 : x + 3;
      const shipLength =
        shipY === 0 || shipY === 9 ? y + ship.length + 1 : y + ship.length + 2;

      for (let i = x; i < shipWidth; i++) {
        for (let j = y; j < shipLength; j++) {
          const data = JSON.stringify({
            gameId,
            x: i,
            y: j,
            indexPlayer,
          });
          attack(ws, data);
        }
      }
    } else {
      // horizontal ship
      const shipLength =
        shipX === 0 || shipX === 9 ? x + ship.length + 1 : x + ship.length + 2;
      const shipWidth = shipY === 0 || shipY === 9 ? y + 2 : y + 3;

      for (let j = y; j < shipWidth; j++) {
        for (let i = x; i < shipLength; i++) {
          const data = JSON.stringify({
            gameId,
            x: i,
            y: j,
            indexPlayer,
          });
          attack(ws, data);
        }
      }
    }
  }
}

export const games = new GameController();
