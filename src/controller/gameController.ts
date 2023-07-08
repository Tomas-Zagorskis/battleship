import { registration } from '../actions/registration';
import { Action, TypeUnion } from '../types/type';

class GameController {
  private readonly actions: Action[];

  constructor(actions: Action[]) {
    this.actions = actions;
  }

  getAction(name: TypeUnion) {
    const action = this.actions.find((action) => action.type === name);
    if (!action) throw new Error('Action not found');
    return action;
  }

  setData(type: TypeUnion, data: string) {
    const action = this.getAction(type);
    action.data = data;
  }
}

export const gameController = new GameController([
  {
    type: 'reg',
    data: '',
    handler: registration,
  },
]);
