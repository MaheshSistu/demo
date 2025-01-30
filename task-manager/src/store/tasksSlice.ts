import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, addTaskApi, deleteTaskApi } from '../api/tasksApi.ts';

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TasksState = {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: TasksState = {
  tasks: [],
  filter: 'all',
  status: 'idle',
  error: null,
};

export const loadTasks = createAsyncThunk('tasks/loadTasks', async () => {
  const tasks = await fetchTasks();
  return tasks;
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: { title: string; completed: boolean }) => {
  const newTask = await addTaskApi(task);
  return newTask;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId: number) => {
  await deleteTaskApi(taskId);
  return taskId;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<'all' | 'completed' | 'pending'>) {
      state.filter = action.payload;
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load tasks';
      });

    builder
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add task';
      });

    builder
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const { setFilter, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
