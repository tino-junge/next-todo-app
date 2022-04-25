import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { ChangeEvent, useState } from 'react';

import { useTodosContext } from '../context/todosContext';
import DatePicker from './datePicker';

export default function AddTodoButton() {
  const { addTodo } = useTodosContext();
  const [open, setOpen] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (isFormInvalid) setIsFormInvalid(false);
    setDescription(e.currentTarget.value);
  };

  const resetForm = () => {
    setDescription('');
    setDueDate(new Date());
  };

  const handleAdd = () => {
    if (!description) {
      setIsFormInvalid(true);
      return;
    }
    addTodo(description, dueDate);
    setOpen(false);
    resetForm();
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
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
          <Button onClick={handleAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
