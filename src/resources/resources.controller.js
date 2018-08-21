const resources = require('./resources.model');
const { createNewResource } = require('../yeoman');
const USER = require("../users/users.model")


function getAllResources(req, res) {
    resources.find()
        .then(response => {
            return res.json(response);
        })
        .catch(response => {
            return res.status(400).send('Resources not found')
        })
}

function getOneResource(req, res) {
    resources.findOne({name : req.params.name})
        .then(response => {
            if (response) {
                res.json(response)
            } else {
                res.status(400).send("There's no resource with name=" + _resource )
            }
        })
}

function postResource (req, res){ 
    resources.findOne({name: req.body.name}, (err, doc) => {
    if(doc){
        return res.status(400).send("There’s already a resource with the name="+req.body.name);
    }else{
        const newResource = new resources(req.body);
        newResource.save()
            .then(response => {
                return res.json(response)
            })
            .catch(response => {
                console.log(response)
                return res.status(400).send('Resource was not created')
            })
        const fields = req.body.params.reduce(function(palabraAnterior, palabraActual, index){
            if(index === 0){
                return palabraActual.name;
            }else{
                return palabraAnterior + "," + palabraActual.name;
            }
        },{});
        const resource = req.body.name;
        createNewResource(resource,fields);
        res.send("Resource was created succesfully")  
    }
})
            
}

function updateResource(req, res) {
     const resourceToUpate = resources.findOne({username: req.params.username}, (err, doc) => {
        if(resourceToUpate){
            doc.name = req.body.name;
            doc.params = req.body.params
            doc.save()
            .then(response => {
                return res.json(response)
            })
            .catch(response => {
                console.log(response)
                return res.status(400).send('User was not update')
            })
        }else{
            return res.status(400).send("There’s no resource with the name="+req.params.name);
        }
    })
}

function removeResource(req, res) {
    resources.findOne({ name : req.params.name}, (err, doc) => {
        if(doc){
            doc.remove();
            return res.json(doc);
        }else{
            return res.status(400).send("There’s no resource with name="+req.params.name);
        }
    })
}


module.exports = { getAllResources, getOneResource, postResource, updateResource, removeResource }