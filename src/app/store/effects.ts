import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTodos, loadTodosFailed, loadTodosSuccess,toggleTodoState } from './actions';
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




  constructor(private actions$: Actions, private todoService: TodoService) {}
}
