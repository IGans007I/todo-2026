import { createTodo, listTodos } from "../src/services/todos.service"

describe('todos services', () => {

  test("list todos is empty", () => {
    const all = listTodos();
    expect(all).toEqual([]);
  })

  test('create and list todos', () => {
    const todo = createTodo('test');
    const all = listTodos();
    expect(all).toEqual([todo]);
  })

  test('Неправильное создание', () => {
    //@ts-ignore    
    expect(() => createTodo()).toThrow('Title is required');
  })
})