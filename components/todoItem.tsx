import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import { blueGrey, green } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import intlFormat from 'date-fns/intlFormat';
import { SnackbarKey, useSnackbar } from 'notistack';

import { useTodosContext } from '../context/todosContext';
import { useTimeout } from '../hooks/useTimeout';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { completeTodo } = useTodosContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const now = new Date().getTime();
  const expTime = todo.dueDate.getTime();

  // TODO notifiction component
  const action = (key?: SnackbarKey) => (
    <Button
      onClick={() => {
        completeTodo(todo.id);
        closeSnackbar(key);
      }}
    >
      Mark as complete
    </Button>
  );
  const showNotification = () => {
    if (todo.status === 'completed') {
      return;
    }
    // TODO todo title prop!
    enqueueSnackbar(todo.description, {
      persist: true,
      preventDuplicate: true,
      action,
    });
  };

  // TODO show notification for todo item when dueDate in the past?
  const timeoutTime = expTime - now;
  useTimeout(showNotification, timeoutTime);

  return (
    <Accordion>
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
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: todo.status === 'completed' ? green[200] : blueGrey[50],
        }}
      >
        <Typography>{todo.description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}
