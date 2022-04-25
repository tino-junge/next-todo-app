import { createContext, FC, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Todo } from '../types/todo';

interface TodosContextProps {
  todos: Todo[];
  addTodo: (description: string) => void;
  completeTodo: (todoId: string) => void;
}

const TodosContext = createContext<TodosContextProps>({
  todos: [],
  addTodo: () => {},
  completeTodo: () => {},
});

interface TodoProviderProps {
  children?: React.ReactNode;
}

export const TodosProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (description: string) =>
      setTodos([
        ...todos,
        {
          id: uuid(),
          description,
          status: 'upcoming',
        },
      ]),
    [todos]
  );

  const completeTodo = useCallback(
    (todoId: string) =>
      setTodos(todos.map((t) => (t.id === todoId ? { ...t, status: 'completed' } : t))),
    [todos]
  );

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        completeTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
