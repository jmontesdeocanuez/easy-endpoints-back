const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const api = require('./api')


const PORT = 4000;
const DB_URL = 'mongodb://localhost:27017/ee-users'

mongoose.connect(DB_URL)
const app = express();

app.use(bodyParser.json())
app.use(cors())
app.use('/api', api)

module.exports = () => {
    return app.listen(PORT, () => console.log(`
      Easyendpoints backend
      
      Server has been started
      Running at http://localhost:${PORT}`
      ))
}