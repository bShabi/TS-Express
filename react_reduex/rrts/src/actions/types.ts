import { type } from 'os';
import { FetchToDoAction, DeleteToDoAction } from '../actions';
export enum ActionTypes {
  FETCH_TODOS,
  DELETE_TODO,
}
export type Action = FetchToDoAction | DeleteToDoAction;
