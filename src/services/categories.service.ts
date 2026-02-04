import { Category, Categories, Todo } from "../types/todo.type";

const store = new Map<Category['id'], Category>();
let iterator = 0;

function listCategories(): Categories {
  return Array.from(store.values());
}

function createCategory(title: Category['title'], description?: string): Category {
  if (!title) {
    throw new Error('Title is required');
  }

  const category: Category = {
    id: ++iterator,
    title,
    description,
  };
  store.set(category.id, category);
  return category;
}

function deleteCategory(id: Category['id']) {
  return store.delete(id);
}

function updateCategory(id: Category['id'], category: Partial<Category>) {
  const currentCategory = getCategory(id);
  if (!currentCategory) {
    return null;
  }
  const updatedCategory = {
    ...currentCategory,
    ...category,
  };
  store.set(id, updatedCategory);
  return updatedCategory;
}

function getCategory(id: Category['id']) {
  return store.get(id);
}

function getTodosByCategoryId(categoryId: number, todosStore: Map<Todo['id'], Todo>): Todo[] {
  const todos: Todo[] = [];
  for (const todo of todosStore.values()) {
    if (todo.categoryIds && todo.categoryIds.includes(categoryId)) {
      todos.push(todo);
    }
  }
  return todos;
}

function addTodosToCategory(categoryId: number, todoIds: number[], todosStore: Map<Todo['id'], Todo>) {
  for (const todoId of todoIds) {
    const todo = todosStore.get(todoId);
    if (todo) {
      if (!todo.categoryIds) {
        todo.categoryIds = [];
      }
      if (!todo.categoryIds.includes(categoryId)) {
        todo.categoryIds.push(categoryId);
        todosStore.set(todoId, todo);
      }
    }
  }
}

function removeTodosFromCategory(categoryId: number, todoIds: number[], todosStore: Map<Todo['id'], Todo>) {
  for (const todoId of todoIds) {
    const todo = todosStore.get(todoId);
    if (todo && todo.categoryIds) {
      todo.categoryIds = todo.categoryIds.filter(id => id !== categoryId);
      todosStore.set(todoId, todo);
    }
  }
}

export {
  listCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getTodosByCategoryId,
  addTodosToCategory,
  removeTodosFromCategory
};