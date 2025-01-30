import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store.ts';
import TaskItem from './TaskItem.tsx';
import { setFilter, loadTasks, deleteTask } from '../store/tasksSlice.ts';
import { Button } from '@mui/material';

const TaskList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filter = useSelector((state: RootState) => state.tasks.filter);

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter((task) => (filter === 'completed' ? task.completed : !task.completed));

  return (
    <div>
      <div>
        <Button onClick={() => dispatch(setFilter('all'))}>All</Button>
        <Button onClick={() => dispatch(setFilter('completed'))}>Completed</Button>
        <Button onClick={() => dispatch(setFilter('pending'))}>Pending</Button>
      </div>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
