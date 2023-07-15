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
  'server_error',
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
  webSocket: WebSocket,
  id: number,
  data: string,
) => Promise<void> | void;

export type User = {
  name: string;
  password: string;
  index: number;
  wins: number;
  id: number;
};

export type Winner = {
  name: string;
  wins: number;
};

export type RoomUser = Omit<User, 'password' | 'wins' | 'id'>;

export type Room = {
  roomId: number;
  roomUsers: RoomUser[];
};
