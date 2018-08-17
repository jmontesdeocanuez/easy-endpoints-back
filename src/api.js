const express = require('express');
const users = require('./users');
const resources = require('./resources');
const cors = require('cors');
const app = module.exports = express();
app.use(cors())
app.use(users.path, users.current);
app.use(resources.path, resources.current);