const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const server = express();
const PORT = process.env.PORT || 5000;

server.use(bodyParser.json());

server.use('/auth', authRoutes); // routes for authentication
server.use('/tasks', taskRoutes); // routes for tasks
server.use('/users', userRoutes); // routes for users

server.use(errorHandler); // error handling middleware

server.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
