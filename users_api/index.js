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
  // Get the result from the fetchAll method
  const result = appController.fetchAll();

  // If an error occurs, result.status will be 'error'.
  // You can send a 500 status code for internal server error or any other appropriate status code
  if (result.status === 'error') {
    res.status(500).send(result.message);
    return;
  }

  // Send a 200 status code for a successful retrieval
  res.status(200).json(result);
});


app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Get the result from the getById method
  const result = appController.getById(id);

  // If an error occurs, result.status will be 'error'.
  // You can send a 404 status code for not found or any other appropriate status code
  if (result.status === 'error') {
    res.status(404).send(result.message);
    return;
  }

  // If the user is found, result.status will be 'success'.
  // Send a 200 status code for a successful retrieval
  res.status(200).json(result);
});


app.post('/users', (req, res) => {
  const { body: user } = req;
  
  if (!user || !user.email) {
    res.status(400).send('Bad request: Missing user or user email in the request');
    return;
  }
  
  user.id = appController.getNextId();

  // Get the result from the insert method
  const result = appController.insert(user);
  
  // If an error occurs, result.status will be 'error'.
  // You can send a 500 status code for internal server error or any other appropriate status code
  if (result.status === 'error') {
    res.status(500).send(result.message);
    return;
  }

  // If the user is inserted successfully, result.status will be 'success'.
  // Send a 201 status code for a successful creation
  res.status(201).json({
    status: result.status,
    message: result.message,
    user
  });
});


app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { body: user } = req;
  if (!user || !user.email) {
    res.status(400).send('Invalid user data');
    return;
  }
  user.id = id;

  // Call the update method and capture the result
  const result = appController.update(user);
  
  // If an error occurs, result.status will be 'error'.
  // You can send a 400 status code (or any other appropriate status code)
  if (result.status === 'error') {
    res.status(400).send(result.message);
    return;
  }

  // If the update is successful, result.status will be 'success'.
  // Send a 200 status code for a successful update
  res.status(200).json({ status: result.status, message: result.message, entitiy: user });
});


app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  
  // Get the result from the clear method
  const result = appController.clear(id);

  // If an error occurs, result.status will be 'error'.
  // You can send a 404 status code for not found or any other appropriate status code
  if (result.status === 'error') {
    res.status(404).send(result.message);
    return;
  }

  // If the deletion is successful, result.status will be 'success'.
  // Send a 200 status code for a successful deletion
  res.status(200).send(result.message);
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
