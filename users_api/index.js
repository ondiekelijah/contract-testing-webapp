const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controllers/controllers');

const app = express();
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:5173'
};

app.use(cors(corsOptions));

const appController = new Controller();

const loadData = () => {
  const data = require('./database/users.json');
  data.reduce((a, v) => {
    v.id = a + 1;
    appController.insert(v);
    return a + 1;
  }, 0);
};

loadData();

app.get('/users', (req, res) => {
  try {
    const users = appController.fetchAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = appController.getById(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send();
  }
});

app.post('/users', (req, res) => {
  const { body: user } = req;
  if (!user || !user.email) {
    res.status(400).send();
    return;
  }
  user.id = appController.getNextId();
  appController.insert(user);
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { body: user } = req;
  if (!user || !user.email) {
    res.status(400).send();
    return;
  }
  user.id = id;
  appController.update(user);
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  appController.clear(id);
  res.status(204).send();
});


module.exports = {
  app,
  appController,
  loadData,
};


const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;
