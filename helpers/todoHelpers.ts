import { Todo } from '../types/todo';

export const getTodoSummary = (todo: Todo) => {
  return todo.description.slice(0, 50);
};
