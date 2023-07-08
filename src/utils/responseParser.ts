import { gameController } from '../controller/gameController';
import { GameInput, types } from '../types/type';

export const parseInput = (input: string) => {
  const { type, data } = JSON.parse(input) as GameInput;

  if (types.includes(type)) throw new Error('Failed on request type');

  const action = gameController.getAction(type);
  gameController.setData(type, data);

  return action;
};
