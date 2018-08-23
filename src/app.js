const express = require('express');
const helmet = require('helmet')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const checkAPIToken = require('./auth/authentication')
const api = require('./api')
const checkLogged = require('./auth/authorization')
const users = require('./users')


const PORT = 4000;
const DB_URL = 'mongodb://localhost:27017/ee-users'

mongoose.connect(DB_URL)
const app = express();
app.use(bodyParser.json())
app.use(helmet());
//app.use(checkAPIToken)
app.use(cors())
//app.use('/api', checkLogged, api)
app.use('/signin', users.signIn)
app.use('/api', checkLogged, api)

module.exports = () => {
    return app.listen(PORT, () => console.log(`
      Easyendpoints backend
      
      Server has been started
      Running at http://localhost:${PORT}`
      ))
}