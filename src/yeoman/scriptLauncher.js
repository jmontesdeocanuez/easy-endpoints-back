module.exports.launchShellCommand = function(command) {
    const shell = require('child_process').exec;
    
    shell(command,
        function (error, stdout, stderr) {
            console.log(stdout);
            if (error !== null) {
                console.log('exec error: ' + error)
            }
        })
}