import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoListComponent} from './todo-list/todo-list.component';
import {DetailTodoComponent} from './detail-todo/detail-todo.component';

const routes: Routes = [{ path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: 'todo/:title', component: DetailTodoComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
