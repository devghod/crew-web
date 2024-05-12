require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 4001;

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.DB_URL, {});
mongoose.connection.on('connected', () => console.log('Database connected'));
mongoose.connection.on('open', () => console.log('Database open'));
mongoose.connection.on('disconnected', () => console.log('Database disconnected'));
mongoose.connection.on('reconnected', () => console.log('Database reconnected'));
mongoose.connection.on('disconnecting', () => console.log('Database disconnecting'));
mongoose.connection.on('close', () => console.log('Database close'));
mongoose.connection.on('error', (error) => console.error(`Database ${error}`));

const indexjs = require("./index");
const testRoute = require("./src/routes/testRoute");
const authRoute = require("./src/routes/auth.route");
const usersRoute = require("./src/routes/users.route");
const rolesRoute = require("./src/routes/roles.route");
const logsRoute = require("./src/routes/logs.route");
const configurationsRoute = require("./src/routes/configurations.route");

app.get('/', (req, res) => {
  const result = indexjs.welcomeFunction();
  console.log(`Hello World! ${result}`);
  res.send(`Hello World! ${result}`);
});

app.use('/api/test', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/roles', rolesRoute);
app.use('/api/logs', logsRoute);
app.use('/api/configurations', configurationsRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});