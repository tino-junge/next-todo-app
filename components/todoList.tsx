import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blueGrey, green } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import intlFormat from 'date-fns/intlFormat';

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
          <Accordion key={`accordion-${todo.id}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`content-${todo.id}`}
              id={`header-${todo.id}`}
              sx={{
                backgroundColor: todo.status === 'completed' ? green[300] : blueGrey[100],
              }}
            >
              <Typography
                mr={10}
                textOverflow="ellipsis"
                maxWidth={100}
                overflow="hidden"
                whiteSpace="nowrap"
              >
                {todo.description}
              </Typography>
              <Typography>
                Due:{' '}
                {intlFormat(todo.dueDate, {
                  year: '2-digit',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
              </Typography>
              {todo.status === 'upcoming' && (
                <Button onClick={() => completeTodo(todo.id)}>Done</Button>
              )}
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: todo.status === 'completed' ? green[200] : blueGrey[50],
              }}
            >
              <Typography>{todo.description}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
