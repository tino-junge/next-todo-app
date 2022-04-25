import { createContext, FC, useContext, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';

import { Todo } from '../types/todo';

interface TodosContextProps {
  todos: Todo[];
  addTodo: (description: string, dueDate: Date) => void;
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

  // To handle multiple todo notifications we use a reference here.
  // It allows us to reference the latest version of our list
  // e.g. when completing a todo that has been created earlier
  const todosRef = useRef(todos);

  const addTodo = (description: string, dueDate: Date) => {
    const updatedTodos: Todo[] = [
      ...todosRef.current,
      {
        id: uuid(),
        description,
        dueDate,
        status: 'upcoming',
      },
    ];
    setTodos(updatedTodos);
    todosRef.current = updatedTodos;
  };

  const completeTodo = (todoId: string) => {
    const updatedTodos: Todo[] = todosRef.current.map((t) =>
      t.id === todoId ? { ...t, status: 'completed' } : t
    );
    setTodos(updatedTodos);
    todosRef.current = updatedTodos;
  };

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
