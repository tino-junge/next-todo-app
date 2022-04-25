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
import { getTodoSummary } from '../helpers/todoHelpers';
import { useTimeout } from '../hooks/useTimeout';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem(props: TodoItemProps) {
  const { todo } = props;
  const { completeTodo } = useTodosContext();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = () => {
    if (todo.status === 'completed') {
      return;
    }
    enqueueSnackbar(getTodoSummary(todo), {
      key: todo.id,
      variant: 'default',
      persist: true,
      preventDuplicate: true,
      action: (key?: SnackbarKey) => (
        <Button
          onClick={() => {
            completeTodo(todo.id);
            closeSnackbar(key);
          }}
        >
          Mark as complete
        </Button>
      ),
    });
  };

  const nowTime = new Date().getTime();
  const dueTime = todo.dueDate.getTime();
  const timeoutDelay = dueTime - nowTime;
  useTimeout(showNotification, timeoutDelay);

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
          mr={5}
          textOverflow="ellipsis"
          width={250}
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {getTodoSummary(todo)}
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
