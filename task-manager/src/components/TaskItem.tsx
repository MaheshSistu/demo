import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '../store/tasksSlice.ts';
import { Checkbox, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch } from '../store/store.ts';

const TaskItem = ({ task }: { task: { id: number; title: string; completed: boolean } }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ListItem>
      <Checkbox
        checked={task.completed}
        onChange={() => dispatch(toggleTask(task.id))}
      />
      <ListItemText primary={task.title} />
      <IconButton onClick={() => dispatch(deleteTask(task.id))}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;
