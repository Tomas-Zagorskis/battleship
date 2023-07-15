import { WebSocket } from 'ws';

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

export interface WebSocketExt extends WebSocket {
  id: number;
}
