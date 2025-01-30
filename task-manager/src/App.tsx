import React from 'react';
import TaskInput from './components/TaskInput.tsx';
import TaskList from './components/TaskList.tsx';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Container>
      <h1>Task Manager</h1>
      <TaskInput />
      <TaskList />
    </Container>
  );
};

export default App;
