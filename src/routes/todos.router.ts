import { Router } from 'express';
import { listTodos, createTodo, deleteTodo,updateTodo, getTodo} from '../services/todos.service';

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

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const todo = getTodo(+id);
    if (!todo){
        return res.status(404).json({
            status: "NOT_FOUND",
            message: "Todo not found",
        });
    }
    res.status(200).json({
        item: todo,
        message: "Todo found",
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const wasDeleted = deleteTodo(+id);
    if (!wasDeleted){
        return res.status(404).json({
            status: "NOT_FOUND",
            message: "Todo not found",
        });
    }
    res.status(200).json({
        message: "Todo deleted",
    });
});
 

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {title, completed} = req.body ?? {}; // <-- Деструктурируем
    
    // Валидация как в POST
    if (title !== undefined) {
        if (typeof title !== "string"){
            return res.status(400).json({
                status : "Bad request",
                message: "Title must be a string",
            });
        }

        if (title.trim().length === 0){
            return res.status(400).json({
                status : "Bad request",
                message: "Title must not be empty",
            });
        }
    }
    
    if (completed !== undefined && typeof completed !== "boolean") {
        return res.status(400).json({
            status : "Bad request",
            message: "Completed must be a boolean",
        });
    }
    
    const todo = updateTodo(+id, {title, completed}); // <-- Передаем только нужные поля
    if (!todo){
        return res.status(404).json({
            status: "NOT_FOUND",
            message: "Todo not found",
        });
    }
    res.status(200).json({
        item: todo,
        message: "Todo updated",
    });
});

export default router;
