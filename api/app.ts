import express from 'express';
import { Task } from './models';

let tasks: Task[] = [];
const app = express();
const port = 3000;
app
  .get('/tasks', (req, res) => {
    res.send(tasks);
  })
  .post('/tasks', (req, res) => {
    const { description } = req.body as Task;
    if (!description) {
      res.sendStatus(400);
      return;
    }

    const id = tasks.reduce((res, curr) => {
      return res > curr.id ? res : curr.id;;
    }, 0);

    tasks.push({ description, isCompleted: false, id });
    res.sendStatus(204);
  })
  .get('/tasks/:id', (req, res) => {
    const id = parseFloat(req.params['id']);
    const task = tasks.find(t => t.id == id);
    if (!task) {
      res.sendStatus(404);
    } else {
      res.send(task);
    }
  })
  .delete('/tasks/:id', (req, res) => {
    const id = parseFloat(req.params['id']);
    const task = tasks.find(t => t.id == id);
    if (task) {
      tasks = tasks.filter(t => t.id != id);
    } 
    
    res.sendStatus(204);
  })
  .put('/tasks/:id', (req, res) => {
    const id = parseFloat(req.params['id']);
    const task = tasks.find(t => t.id == id);
    if (task) {
      const { description, isCompleted } = req.body as Task;
      if (!description) {
        res.sendStatus(400);
        return;
      }

      task.description = description;
      task.isCompleted = isCompleted;
      res.sendStatus(202);
    } else {
      res.sendStatus(404);
    }
  });

app.listen(port, ((err: any) => {
  if (err) {
    console.error(err);
  }

  console.log(`server is listening on ${port}`);
}) as () => void);