const { promisify } = require('../../services/router')
const { getAllUsers, getOneUser, createUser, updateUser, removeUser } = require('../users.controller')


module.exports.getAll = promisify(async (req, res) => {
    return getAllUsers(req, res)
})
module.exports.getAll.verb = 'get'
module.exports.getAll.path = '/'

module.exports.getOne = promisify(async (req, res) => {
    return getOneUser(req, res)
})
module.exports.getOne.verb = 'get'
module.exports.getOne.path = '/:username'

module.exports.postUser = promisify(async (req, res) => {
    return createUser(req, res)
})
module.exports.postUser.verb = 'post'
module.exports.postUser.path = '/'

module.exports.updateUser = promisify(async (req, res) => {
    return updateUser(req, res)
})
module.exports.updateUser.verb = 'put'
module.exports.updateUser.path = '/:username'

module.exports.removeUser = promisify(async (req, res) => {
    return removeUser(req, res)
})
module.exports.removeUser.verb = 'delete'
module.exports.removeUser.path = '/:username'
