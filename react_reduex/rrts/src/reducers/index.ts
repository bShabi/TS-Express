import { combineReducers } from 'redux';
import { Todo } from '../actions';
import { todosReducer } from './todo';

export interface StoreState {
  todos: Todo[];
}
export const reducers = combineReducers<StoreState>({
  todos: todosReducer,
});
