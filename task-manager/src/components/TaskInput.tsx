import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice.ts';
import { AppDispatch } from '../store/store.ts';
const TaskInput = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      const newTask = {
        title: taskTitle,
        completed: false,
      };
      dispatch(addTask(newTask));
      setTaskTitle('');
    }
  };

  return (
    <div>
      <TextField
        label="New Task"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        variant="outlined"
      />
      <Button onClick={handleAddTask} variant="contained" color="primary">
        Add Task
      </Button>
    </div>
  );
};

export default TaskInput;
