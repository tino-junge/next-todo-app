import { createContext, FC, useCallback, useContext, useState } from 'react';

type Todo = {
  // TODO uuid
  id: number;
  description: string;
  // TODO due date
  status: 'upcoming' | 'completed';
};

interface TodosContextProps {
  todos: Todo[];
  addTodo: (description: string) => void;
  completeTodo: (todoId: number) => void;
}

const TodosContext = createContext<TodosContextProps>({
  todos: [],
  addTodo: () => {},
  completeTodo: () => {},
});

interface TodoProviderProps {
  children?: React.ReactNode;
}

function getRandomId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export const TodosProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback(
    (description: string) =>
      setTodos([
        ...todos,
        {
          id: getRandomId(),
          description,
          status: 'upcoming',
        },
      ]),
    [todos]
  );

  const completeTodo = useCallback(
    (todoId: number) =>
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
