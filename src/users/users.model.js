const mongoose = require ('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const USERschema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    name: String,
    backend: String
})
USERschema.plugin(uniqueValidator);
const USER = mongoose.model('user', USERschema);
module.exports = USER;