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

function deleteTodo(id: Todo['id']) {
        return store.delete(id);
    }

function updateTodo(id: Todo['id'], todo: Partial<Todo>) {
    const currentTodo = getTodo(id);
    if (!currentTodo) {
        return null;
    }
    const updatedTodo = {
        ...currentTodo,
        ...todo,
    };
    store.set(id, updatedTodo);
    return updatedTodo;
}


function getTodo(id: Todo['id']) {
        return store.get(id);
    }










    export {
        listTodos,
        createTodo,
        deleteTodo,
        updateTodo,
        getTodo
    };