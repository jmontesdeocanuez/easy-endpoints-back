const { runDockerComposeOnEC2 } = require('./functions')
if (process.argv[2]) {
    runDockerComposeOnEC2(process.argv[2])
} else {
    console.log("Indica una dirección IP")
}