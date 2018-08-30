const { launchShellCommand } = require('./scriptLauncher')

function execCommandOnEC2(IP, command){
    console.log(`Ejecutando el comando "${command}`)
    return launchShellCommand(`ssh -o StrictHostKeyChecking=no ubuntu@${IP} -i aws/assets/accesoServerPruebas.pem.txt ${command}`);
}

async function runDockerComposeOnEC2(IP) {
    await execCommandOnEC2(IP, `./runDockerCompose.sh`);
}

module.exports = { runDockerComposeOnEC2 }