import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useTodosContext } from '../context/todosContext';
import { Todo } from '../types/todo';

interface TodoListProps {
  title: string;
  todos: Todo[];
}

export default function TodoList(props: TodoListProps) {
  const { completeTodo } = useTodosContext();
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'left',
        }}
      >
        <Typography variant="h5" component="h5" gutterBottom>
          {props.title}
        </Typography>
        {props.todos.map((todo) => (
          // TODO background green when completed
          <Accordion key={`accordion-${todo.id}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`content-${todo.id}`}
              id={`header-${todo.id}`}
            >
              {/* TODO summary? */}
              <Typography>{todo.description}</Typography>
              {todo.status === 'upcoming' && (
                <Button onClick={() => completeTodo(todo.id)}>Done</Button>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{todo.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
