// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.update({region: 'eu-west-1'})
// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

// AMI is amzn-ami-2011.09.1.x86_64-ebs
var instanceParams = {
   //ImageId: 'ami-2a7d75c0', 
   ImageId: 'ami-078c5eeff5f8187af', 
   InstanceType: 't2.micro',
   KeyName: 'accesoServerPruebas',
   SecurityGroupIds: ["sg-0f916fb6cf244c502"],
   MinCount: 1,
   MaxCount: 1
};

// Create a promise on an EC2 service object
//var instancePromise = new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise();
//var IP;
function getIPofAnInstance(instance) {
  //return new Promise((resolve, reject) => {
    const params = {
      InstanceIds: [instance]
    };

    ec2.waitFor('instanceExists',params, (err, data) => {
      if( err) return console.error(err)
      console.log(data.Reservations[0])
      //resolve(data.Reservations[0].Instances[0].PublicDnsName)
    })
    let result
    ec2.describeInstances(params, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        result = data.Reservations[0].Instances[0].PublicDnsName;
        console.log("AAAAAAAAG"+result)
        console.log('Tengo el resultado', JSON.stringify(data));
        //resolve(result);
        return result;
      }
    });


  //});
}


async function createInstance() {
  let created = await create();
  var params = {
    InstanceIds : [ instanceId ]
  }
  


  return new Promise((resolve, reject) => {
    ec2.describeInstances(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else {
          //console.log(data.Reservations[0].Instances[0].PublicIpAddress);           // successful response
          const datos = {
            ip: data.Reservations[0].Instances[0].PublicDnsName,
            instanceId: instanceId
          }
                     // successful response
          resolve(datos);
        }
      });
    
  });
  /*console.log("Created" + created);
  console.log("Created" + created);*/

  //console.log("Created" + create());
  
}

var instanceId = "";
function create() {
  return new AWS.EC2({apiVersion: '2016-11-15'}).runInstances(instanceParams).promise()
                    .then(function(data) {
                              console.log("hola estoy creando la maquina jeje saludos");
                              console.log(data.Instances[0].InstanceId);
                              console.log(data.Instances[0].PublicIpAddress);
                              instanceId = data.Instances[0].InstanceId;
                              console.log(data.Instances[0].PublicIpAddress)
                              console.log("Created instance", instanceId);
                              return data;
                            }).catch(
                              function(err) {
                              console.error(err, err.stack);
                            });
}

function terminateInstance(instanceID) {
  const params = {
    InstanceIds: [instanceID]
  }
  ec2.terminateInstances(params, function(err,data){
    if (err) console.log(err, err.stack);
    else  console.log(data);
  })
}

module.exports = { createInstance, getIPofAnInstance, terminateInstance }