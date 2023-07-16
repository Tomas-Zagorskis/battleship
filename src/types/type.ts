import { WebSocket } from 'ws';

export interface WebSocketExt extends WebSocket {
  id: number;
}

export const types = [
  'reg',
  'update_winners',
  'create_room',
  'add_user_to_room',
  'create_game',
  'single_play',
  'update_room',
  'add_ships',
  'start_game',
  'attack',
  'randomAttack',
  'turn',
  'finish',
  'error',
] as const;

export type TypeUnion = (typeof types)[number];

export interface GameInput {
  type: TypeUnion;
  data: string;
  id: number;
}

export type Action = {
  type: TypeUnion;
  data: string;
  handler: ActionHandler;
};

type ActionHandler = (
  webSocket: WebSocketExt,
  data: string,
) => Promise<void> | void;

export type User = {
  name: string;
  password: string;
  index: number;
  wins: number;
};

export type Winner = {
  name: string;
  wins: number;
};

export type RoomUser = Pick<User, 'name' | 'index'>;

export type Room = {
  roomId: number;
  roomUsers: RoomUser[];
};

export type StartGame = {
  gameId: number;
  ships: Ship[];
  indexPlayer: number;
};

export type Ship = {
  position: Position;
  direction: boolean;
  length: number;
  type: ShipType;
};

export type Position = {
  x: number;
  y: number;
};

const shipTypes = ['small', 'medium', 'large', 'huge'] as const;

export type ShipType = (typeof shipTypes)[number];

export type Game = {
  gameId: number;
  players: Player[];
};

export type Player = {
  indexPlayer: number;
  ws: WebSocketExt;
  ships: Ship[];
};

export type Attack = {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
};

export type BoardInfo = {
  occupiedCoordMap: Map<Position, Ship>;
  shipHealths: Map<Ship, number>;
  totalHealth: number;
};

const shotTypes = ['miss', 'killed', 'shot'] as const;

export type ShotType = (typeof shotTypes)[number];
