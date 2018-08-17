const { createRouter } = require('../services/router') 
const routes = require('./routes');

module.exports.path = '/resources';
module.exports.current = createRouter(routes);