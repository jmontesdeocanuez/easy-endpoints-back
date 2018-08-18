const { promisify } = require('../../services/router')
const { createNewResource } = require('../../yeoman');
const USER = require('../../users/users.model');

module.exports.postResource = promisify(async (req, res) => {
        USER.findOne({username: req.body.username}, (err, doc) => {
            if(doc){
                const username = req.body.username;
                const fields = req.body.resource.params.reduce(function(palabraAnterior, palabraActual, index){
                    if(index === 0){
                        return palabraActual.name;
                    }else{
                        return palabraAnterior + "," + palabraActual.name;
                    }
                },{});
                console.log(fields);
                const resource = req.body.resource.name;
                createNewResource(username,resource,fields);
                res.send("Resource was created succesfully")
            }else{
                return res.status(400).send("There’s no user with username="+req.params.username);
            }
        })    
})
module.exports.postResource.verb = 'post'
module.exports.postResource.path = '/'