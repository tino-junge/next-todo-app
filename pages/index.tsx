import type { NextPage } from 'next';

import { AddTodoButton } from '../components/addTodoButton';
import { PageLayout } from '../components/pageLayout';
import { TodoList } from '../components/todoList';
import { useTodosContext } from '../context/todosContext';

const Home: NextPage = () => {
  const { todos } = useTodosContext();
  return (
    <PageLayout>
      <TodoList title="Upcoming" todos={todos.filter((t) => t.status === 'upcoming')} />
      <AddTodoButton />
      <TodoList title="Completed" todos={todos.filter((t) => t.status === 'completed')} />
    </PageLayout>
  );
};

export default Home;
