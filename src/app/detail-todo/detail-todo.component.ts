import { Component, OnInit } from '@angular/core';
import {Todo} from '../models/todo';
import {ActivatedRoute} from '@angular/router';
import {selectTodoByTitle} from '../store/selectors';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-detail-todo',
  templateUrl: './detail-todo.component.html',
  styleUrls: ['./detail-todo.component.scss']
})
export class DetailTodoComponent implements OnInit {
  todo?: Todo;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (title) {
      this.store.select(selectTodoByTitle(title)).subscribe(todo => {
        this.todo = todo;
      });
    }
  }
}
