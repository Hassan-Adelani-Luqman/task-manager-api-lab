const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: false },
  { id: 3, title: 'Go for a walk', completed: true },
];

let nextId = 4;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: '"title" field is required' });
  }
  const newTask = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  const deleted = tasks.splice(index, 1)[0];
  res.json({ message: 'Task deleted', task: deleted });
});

app.listen(PORT, () => {
  console.log(`Task Manager API running on http://localhost:${PORT}`);
});
