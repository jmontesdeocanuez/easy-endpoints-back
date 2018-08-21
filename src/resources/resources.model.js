const mongoose = require ('mongoose');
const RESOURCEschema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    params: [{
        name: String,
        types: String
    }]
})

const resources = mongoose.model('resource', RESOURCEschema);
module.exports = resources;