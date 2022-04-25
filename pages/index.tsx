import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';

import AddTodoButton from '../components/addTodoButton';
import TodoList from '../components/todoList';
import { useTodosContext } from '../context/todosContext';

const Home: NextPage = () => {
  const { todos } = useTodosContext();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AddTodoButton />
        <TodoList title="Upcoming" todos={todos.filter((t) => t.status === 'upcoming')} />
        <TodoList title="Completed" todos={todos.filter((t) => t.status === 'completed')} />
      </Box>
    </Container>
  );
};

export default Home;
