const { createRouter } = require('../services/router') 
const routes = require('./routes');

module.exports.path = '/users';
module.exports.current = createRouter(routes);
module.exports.signIn = createRouter(require('../auth/router'))
