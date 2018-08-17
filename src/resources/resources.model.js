const mongoose = require ('mongoose');
const RESOURCEschema = mongoose.Schema({
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

const USER = mongoose.model('resource', RESOURCEschema);
module.exports = USER;