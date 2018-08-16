const express = require('express');
const users = require('./users');

const app = module.exports = express();

app.use(users.path, users.current)