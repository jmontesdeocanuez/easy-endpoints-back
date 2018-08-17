const { launchShellCommand } = require('./scriptLauncher');

function createNewResource(user, resource, fields) {
    launchShellCommand(`./scripts/newResource.sh ${user} ${resource} ${fields}`)
}

module.exports = { createNewResource }