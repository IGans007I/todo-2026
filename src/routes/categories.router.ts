import { Router } from 'express';
import {
  listCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getTodosByCategoryId,
  addTodosToCategory,
  removeTodosFromCategory
} from '../services/categories.service';
import { getStore } from '../services/todos.service';

const router = Router();

// Получение всех категорий (без тудушек)
router.get('/', (_req, res) => {
  res.status(200).json({
    items: listCategories(),
    message: "List of categories",
  });
});

// Создание категории
router.post('/', (req, res) => {
  const { title, description } = req.body ?? {};

  if (!title) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Title is required',
    });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Title must be a string',
    });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Title must not be empty',
    });
  }

  const category = createCategory(title, description);

  res.status(201).json({
    item: category,
    message: 'Category created',
  });
});

// Получение категории по ID (с тудушками)
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const category = getCategory(+id);
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }

  const todosStore = getStore();
  const todos = getTodosByCategoryId(+id, todosStore);

  res.status(200).json({
    item: {
      ...category,
      todos
    },
    message: "Category found",
  });
});

// Удаление категории
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const wasDeleted = deleteCategory(+id);
  if (!wasDeleted) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }
  res.status(200).json({
    message: "Category deleted",
  });
});

// Обновление категории
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body ?? {};

  if (title !== undefined) {
    if (typeof title !== "string") {
      return res.status(400).json({
        status: "Bad request",
        message: "Title must be a string",
      });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({
        status: "Bad request",
        message: "Title must not be empty",
      });
    }
  }

  const category = updateCategory(+id, { title, description });
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }
  res.status(200).json({
    item: category,
    message: "Category updated",
  });
});

// Добавление тудушек в категорию (массивом)
router.post("/:id/todos", (req, res) => {
  const { id } = req.params;
  const { todos: todoIds } = req.body ?? {};

  const category = getCategory(+id);
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }

  if (!Array.isArray(todoIds)) {
    return res.status(400).json({
      status: "Bad request",
      message: "Todos must be an array of numbers",
    });
  }

  const todosStore = getStore();
  addTodosToCategory(+id, todoIds, todosStore);

  res.status(200).json({
    message: "Todos added to category",
    addedTodos: todoIds
  });
});

// Удаление тудушек из категории (массивом)
router.delete("/:id/todos", (req, res) => {
  const { id } = req.params;
  const { todos: todoIds } = req.body ?? {};

  const category = getCategory(+id);
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }

  if (!Array.isArray(todoIds)) {
    return res.status(400).json({
      status: "Bad request",
      message: "Todos must be an array of numbers",
    });
  }

  const todosStore = getStore();
  removeTodosFromCategory(+id, todoIds, todosStore);

  res.status(200).json({
    message: "Todos removed from category",
    removedTodos: todoIds
  });
});

// Добавление одной тудушки в категорию
router.post("/:categoryId/todos/:todoId", (req, res) => {
  const { categoryId, todoId } = req.params;

  const category = getCategory(+categoryId);
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }

  const todosStore = getStore();
  addTodosToCategory(+categoryId, [+todoId], todosStore);

  res.status(200).json({
    message: "Todo added to category",
    addedTodo: +todoId
  });
});

// Удаление одной тудушки из категории
router.delete("/:categoryId/todos/:todoId", (req, res) => {
  const { categoryId, todoId } = req.params;

  const category = getCategory(+categoryId);
  if (!category) {
    return res.status(404).json({
      status: "NOT_FOUND",
      message: "Category not found",
    });
  }

  const todosStore = getStore();
  removeTodosFromCategory(+categoryId, [+todoId], todosStore);

  res.status(200).json({
    message: "Todo removed from category",
    removedTodo: +todoId
  });
});

export default router;