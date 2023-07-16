import {
  addShips,
  addUserToRoom,
  createRoom,
  registration,
  updateWinners,
} from '../actions';
import { Action, TypeUnion } from '../types/type';

class AppController {
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

export const appController = new AppController([
  {
    type: 'reg',
    data: '',
    handler: registration,
  },
  {
    type: 'update_winners',
    data: '',
    handler: updateWinners,
  },
  {
    type: 'create_room',
    data: '',
    handler: createRoom,
  },
  {
    type: 'add_user_to_room',
    data: '',
    handler: addUserToRoom,
  },
  {
    type: 'add_ships',
    data: '',
    handler: addShips,
  },
]);
