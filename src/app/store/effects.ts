import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess, toggleTodoState, addTodo } from './actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TodoService } from '../services/todo.service';

@Injectable()
export class Effects {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      mergeMap(() =>
        this.todoService.list().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  toggleTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleTodoState),
      mergeMap(({ todo }) =>
        this.todoService.toggleTodoState(todo).pipe(
          map((updatedTodo) => ({
            type: '[Todo API] Toggle Todo Success',
            todo: updatedTodo,
          })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      mergeMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map((savedTodo) => ({
            type: '[Todo API] Add Todo Success',
            todo: savedTodo,
          })),
          catchError(() => [loadTodosFailed()])
        )
      )
    )
  );




  constructor(private actions$: Actions, private todoService: TodoService) {}
}
