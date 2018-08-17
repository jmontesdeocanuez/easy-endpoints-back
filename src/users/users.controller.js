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
     const userToUpdate = USER.findOne({username: req.params.username}, (err, doc) => {
        if(userToUpdate){
            doc.username = req.body.username;
            doc.password = req.body.password;
            doc.email = req.body.email;
            doc.name = req.body.name;
            doc.save()
            .then(response => {
                return res.json(response)
            })
            .catch(response => {
                console.log(response)
                return res.status(400).send('User was not update')
            })
        }else{
            return res.status(400).send("There’s no user with username="+req.params.username);
        }
    })
}

function removeUser(req, res) {
    USER.findOne({username: req.params.username}, (err, doc) => {
        if(doc){
            doc.remove();
            return res.json(doc);
        }else{
            return res.status(400).send("There’s no user with username="+req.params.username);
        }
    })
}


module.exports = { getAllUsers, getOneUser, createUser, updateUser, removeUser }