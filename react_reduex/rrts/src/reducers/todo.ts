import { Todo, Action, ActionTypes } from '../actions';
export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TODOS:
      return action.payload;
    default:
      return state;
  }
};
