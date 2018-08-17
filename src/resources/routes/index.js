const { promisify } = require('../../services/router')
const { getAllUsers, getOneUser, createUser, updateUser, removeUser } = require('../users.controller')

module.exports.postResource = promisify(async (req, res) => {
//TODO
})
module.exports.postResource.verb = 'post'
module.exports.postResource.path = '/'