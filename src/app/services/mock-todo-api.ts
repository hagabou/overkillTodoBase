import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class MockTodoApi implements InMemoryDbService {

  createDb(): {} {
    const todos: Todo[] = [
      { title: 'todo in memory 1', isClosed: false, description: 'Description 1' },
      { title: 'todo in memory 2', isClosed: false },
      { title: 'todo in memory 3', isClosed: true },
      { title: 'todo in memory 4', isClosed: false },
    ];
    return { todos };
  }

   put(reqInfo: any): {}{
    const updatedTodo = reqInfo.utils.getJsonBody(reqInfo.req);
    const todos = reqInfo.collection;
    const index = todos.findIndex((todo: Todo) => todo.title === updatedTodo.title);

    if (index > -1) {
      todos[index] = updatedTodo;
    }

    return reqInfo.utils.createResponse$(() => ({
      body: updatedTodo,
      status: 200,
    }));
  }

}
