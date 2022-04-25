import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { NextPage } from 'next';

import { useTodosContext } from '../context/todosContext';

const Home: NextPage = () => {
  const { todos, addTodo, completeTodo } = useTodosContext();
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
        <Typography variant="h4" component="h1" gutterBottom>
          The Next ToDo App
        </Typography>
        <Button onClick={() => addTodo((Math.random() + 1).toString(36).substring(7))}>Add</Button>
        <div>
          Upcoming
          {/* TODO selector */}
          {todos
            .filter((t) => t.status === 'upcoming')
            .map((todo, i) => {
              return (
                <div key={i}>
                  {todo.description} <Button onClick={() => completeTodo(todo.id)}>Done</Button>
                </div>
              );
            })}
        </div>
        <div>
          Completed
          {/* TODO selector */}
          {todos
            .filter((t) => t.status === 'completed')
            .map((todo, i) => {
              return <div key={i}>{todo.description}</div>;
            })}
        </div>
      </Box>
    </Container>
  );
};

export default Home;
