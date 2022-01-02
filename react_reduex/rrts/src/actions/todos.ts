import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
const url = 'https://jsonplaceholder.typicode.com/todos';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
export interface FetchToDoAction {
  type: ActionTypes.FETCH_TODOS;
  payload: Todo[];
}

export interface DeleteToDoAction {
  type: ActionTypes.DELETE_TODO;
  payload: number;
}
export const fetchToDos = () => {
  return async (dispath: Dispatch) => {
    const response = await axios.get<Todo[]>(url);

    dispath<FetchToDoAction>({
      type: ActionTypes.FETCH_TODOS,
      payload: response.data,
    });
  };
};
export const delTodo = (id: number): DeleteToDoAction => {
  return {
    type: ActionTypes.DELETE_TODO,
    payload: id,
  };
};
