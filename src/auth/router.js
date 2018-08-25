const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { promisify } = require('../services/router');
const moment = require('moment')

const USER = require('../users/users.model');

module.exports.login = promisify(async (req, res) => {
    USER.findOne({"username" : req.body.username, "password": md5(req.body.password)}, (err, user) => {
        if(err) return res.status(500).send(err);
        if(user != null){
            const token =  jwt.sign(
                { 
                    username: user.username,
                    exp: moment().add(14, 'days').unix() 
                }, 
                '1234',
    
            )
            return res.status(200).json(token);
        } 

    })
  })
  
  module.exports.login.verb = 'post'
  module.exports.login.path = '/'