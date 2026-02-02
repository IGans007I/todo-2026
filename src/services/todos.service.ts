import { Todo, Todos } from "../types/todo.type";

const store = new Map<Todo['id'], Todo>();
let iterator = 0;

function listTodos(): Todos {
  return Array.from(store.values());
}

function createTodo(title: Todo['title']): Todo {

  if (!title) {
    throw new Error('Title is required');
  }

  const todo: Todo = {
    id: ++iterator,
    title,
    completed: false,
  }
  store.set(todo.id, todo);
  return todo;
}

export {
  listTodos,
  createTodo
};