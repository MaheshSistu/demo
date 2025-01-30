const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  return tasks;
};

export const addTaskApi = async (task: { title: string; completed: boolean }) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  const newTask = await response.json();
  return newTask;
};

export const deleteTaskApi = async (taskId: number) => {
  await fetch(`${API_URL}/${taskId}`, { method: 'DELETE' });
};
