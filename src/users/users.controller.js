const USER = require('./users.model');
const assert = require('assert')
const jwt = require('jsonwebtoken');
const md5 = require('md5');

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
                res.status(404).send("There's no user with username=" + _username)
            }
        })
}

function createUser(req, res) {
    if (req.body) {
        const newUser = new USER({
            username: req.body.username,
            password: md5(req.body.password),
            email: req.body.email,
            name: req.body.name
        });
        newUser.save()
            .then(response => {
                return res.json(response)
            })
            .catch(response => {
                const objErrors = Object.keys(response.errors)
                let errores = [];  
                for (let i = 0; i < objErrors.length; i++) { 
                    console.log(objErrors[i]);      
                switch (objErrors[i]) {
                    case  "email" :
                        errores.push("Introduzca un email");
                        break;
                    case  "username" :
                        if (response.errors.username.kind === "unique") {
                           errores.push("El nombre de usuario ya está en uso.");
                        } else {
                            errores.push("Introduzca un nombre de usuario.");
                        }
                        break;
                    case "password":
                            errores.push("Introduzca una contraseña");
                        break;
                }
            }
            return res.status(400).send(errores);
            })
    } else {
        return res.status(400).send('User was not created')
    }
}


function updateUser(req, res) {
    const userToUpdate = USER.findOne({ username: req.params.username }, (err, doc) => {
        if (userToUpdate) {
            doc.username = req.body.username;
            doc.password = req.body.password;
            doc.email = req.body.email;
            doc.name = req.body.name;
            doc.save()
                .then(response => {
                    return res.json(response)
                })
                .catch(response => {
                    const objErrors = Object.keys(response.errors)
                let errores = [];  
                console.log(objErrors);  
                for (let i = 0; i < objErrors.length; i++) {  
                switch (objErrors[i]) {
                    case "username" :
                    if (response.errors.username.kind === "unique") {
                        errores.push("El nombre de usuario ya está en uso.");
                     } else {
                         errores.push("Introduzca un nombre de usuario.");
                     }
                     break;
                    case  "email" :
                        errores.push("Introduzca un email");
                        break;
                    case "password":
                            errores.push("Introduzca una contraseña");
                        break;
                }
            }
            return res.status(400).send(errores);
            })
        } else {
            return res.status(400).send("There’s no user with username=" + req.params.username);
        }
    })
}

function removeUser(req, res) {
    USER.findOne({ username: req.params.username }, (err, doc) => {
        if (doc) {
            doc.remove();
            return res.json(doc);
        } else {
            return res.status(400).send("There’s no user with username=" + req.params.username);
        }
    })
}


module.exports = { getAllUsers, getOneUser, createUser, updateUser, removeUser }