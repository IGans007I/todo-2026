import { Router } from 'express';
import { listTodos, createTodo } from '../services/todos.service';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    items: listTodos(),
    message: "List of todos",
  });
});

router.post('/', (req, res) => {
  // Varinat 1
  const { title } = req.body ?? {};

  // Variant 2
  // const title = req.body.title;

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

  const todo = createTodo(title);

  res.status(201).json({
    item: todo,
    message: 'Todo created',
  });

});

export default router;
