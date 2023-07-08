import { WebSocket } from 'ws';

export const types = [
  'reg',
  'update_winners',
  'create_room',
  'add_user_to_room',
  'create_game',
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

type ActionHandler = (data: string, webSocket: WebSocket) => Promise<string>;

export type User = {
  name: string;
  password: string;
  index: number;
  wins: number;
};
