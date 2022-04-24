import { createContext, FC, useCallback, useContext, useState } from 'react';

type Todo = {
  description: string;
};

interface TodosContextProps {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
}

const TodosContext = createContext<TodosContextProps>({
  todos: [],
  addTodo: () => {},
});

interface TodoProviderProps {
  children?: React.ReactNode;
}

export const TodosProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((newTodo: Todo) => setTodos([...todos, newTodo]), [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
