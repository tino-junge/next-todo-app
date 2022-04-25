import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { Todo } from '../types/todo';
import { TodoItem } from './todoItem';

interface TodoListProps {
  title: string;
  todos: Todo[];
}

export function TodoList(props: TodoListProps) {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'left',
          minWidth: 300,
        }}
      >
        <Typography variant="h5" component="h5" gutterBottom>
          {props.title}
        </Typography>
        {props.todos.map((todo) => (
          <TodoItem key={`todo-${todo.id}`} todo={todo} />
        ))}
      </Box>
    </Container>
  );
}
