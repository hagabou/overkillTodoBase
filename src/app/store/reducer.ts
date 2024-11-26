import {Todo} from '../models/todo';
import {createReducer, on} from '@ngrx/store';
import {loadTodosSuccess, toggleTodoState} from './actions';

export const featureKey = 'todosStore';

export interface State {
  todos: ReadonlyArray<Todo>;
}

export const initialState: State = {
  todos: [],
};

export const todosReducer = createReducer(
  initialState,
  on(
    loadTodosSuccess,
    (state, { todos }) => ({
      ...state,
      todos
    })),
    on(toggleTodoState, (state, { todo }) => {
      const updatedTodos = state.todos.map(t =>
        t === todo ? { ...t, isClosed: !t.isClosed } : t
      );
      return {
        ...state,
        todos: updatedTodos.sort((a, b) => Number(a.isClosed) - Number(b.isClosed)),
      };
    })
);
