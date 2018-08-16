const mongoose = require ('mongoose');
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
    name: String
})

const USER = mongoose.model('user', USERschema);
module.exports = USER;