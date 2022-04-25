import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';

import { useTodosContext } from '../context/todosContext';
import { DatePicker } from './datePicker';

export function AddTodoButton() {
  const { addTodo } = useTodosContext();
  const { enqueueSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (isFormInvalid) setIsFormInvalid(false);
    setDescription(e.currentTarget.value);
  };

  const resetForm = () => {
    setDescription('');
    setDueDate(new Date());
  };

  const handleSubmit = () => {
    if (!description) {
      setIsFormInvalid(true);
      return;
    }
    addTodo(description, dueDate);
    setIsDialogOpen(false);
    resetForm();
    enqueueSnackbar('Todo created!', {
      variant: 'success',
      persist: false,
    });
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          minWidth: 300,
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Add
        </Button>
        <Dialog open={isDialogOpen} onClose={handleClose} maxWidth="lg">
          <DialogTitle>Add a new ToDo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              rows={4}
              multiline
              variant="standard"
              onChange={handleDescriptionChange}
              error={isFormInvalid}
            />
            <DatePicker date={dueDate} setDate={setDueDate} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
