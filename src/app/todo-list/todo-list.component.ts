import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Todo} from '../models/todo';
import {Store} from '@ngrx/store';
import {selectTodos} from '../store/selectors';
import {loadTodos, toggleTodoState, addTodo} from '../store/actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos$: Observable<ReadonlyArray<Todo>>;
  newTodoTitle = '';
  newTodoDescription = '';

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

  addTodo(): void {
    if (!this.newTodoTitle.trim()) {
      alert('Title is required!');
      return;
    }

    const newTodo: Todo = {
      title: this.newTodoTitle.trim(),
      description: this.newTodoDescription.trim() || '',
      isClosed: false,
    };

    this.store.dispatch(addTodo({ todo: newTodo }));

    // Réinitialiser les champs
    this.newTodoTitle = '';
    this.newTodoDescription = '';
  }

}
