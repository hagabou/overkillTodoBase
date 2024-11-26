import {createFeatureSelector, createSelector} from '@ngrx/store';
import {featureKey, State} from './reducer';

export const getState = createFeatureSelector<State>(featureKey);

export const selectTodos = createSelector(
  getState,
  (state: State) => state.todos,
);

export const selectTodoByTitle = (title: string) =>
  createSelector(selectTodos, (todos) =>
    todos.find((todo) => todo.title === title)
  );
