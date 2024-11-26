import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../store/selectors';
import {loadTodos, toggleTodoState} from '../store/actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;

  constructor(private store: Store, private router: Router) {
    this.todos$ = this.store.select(selectTodos);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  toggleTodo(todo: Todo): void {
    this.store.dispatch(toggleTodoState({todo}));
  }

  viewDetails(todo: Todo): void {
    this.router.navigate(['/todo', todo.title]); // Remplacez par un identifiant unique si nécessaire
  }

}
