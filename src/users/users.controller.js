const USER = require('./users.model');

function getAllUsers(req, res) {
    USER.find()
        .then(response => {
            res.json(response);
        })
}

function getOneUser(req, res) {
    const _username = req.params.username;
    USER.findOne({ username: _username })
        .then(response => {
            if (response) {
                res.json(response)
            } else {
                res.status(400).send("There's no user with username=" + _username)
            }
        })
}

function createUser(req, res) {
    console.log(req.body)
    if (req.body) {
        const newUser = new USER(req.body);
        newUser.save()
            .then(response => {
                return res.json(response)
            })
            .catch(response => {
                console.log(response)
                return res.status(400).send('User was not createdd')
            })
    } else {
        return res.status(400).send('User was not created')
    }
}

function updateUser(req, res) {
    return res.status(500).send('Not implemented yet')
}

function removeUser(req, res) {
    return res.status(500).send('Not implemented yet')
}

module.exports = { getAllUsers, getOneUser, createUser, updateUser, removeUser }