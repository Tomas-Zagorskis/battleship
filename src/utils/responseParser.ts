import { appController } from '../controller/appController';
import { GameInput } from '../types/type';

export const parseInput = async (input: string) => {
  const { type, data } = (await JSON.parse(input)) as GameInput;

  const action = appController.getAction(type);
  appController.setData(type, data);

  return action;
};
