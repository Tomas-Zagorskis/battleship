import { gameController } from '../controller/gameController';
import { GameInput } from '../types/type';

export const parseInput = async (input: string) => {
  const { type, data } = (await JSON.parse(input)) as GameInput;

  const action = gameController.getAction(type);
  gameController.setData(type, data);

  return action;
};
