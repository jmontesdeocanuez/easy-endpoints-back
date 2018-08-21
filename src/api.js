const express = require('express');
const users = require('./users');
const cors = require('cors');
const app = module.exports = express();
app.use(cors())
app.use(users.path, users.current);
