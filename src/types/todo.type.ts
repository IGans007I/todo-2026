type Todo = {
  id: number;
  title: string;
  completed: boolean;
  categoryIds?: number[];
}

type Todos = Todo[];

type Category = {
  id: number;
  title: string;
  description?: string;
}

type Categories = Category[];

export { Todo, Todos, Category, Categories };