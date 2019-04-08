const merge = require('webpack-merge');
const prodEnv = require('./prod.env');
const env = require('../../settings/guiDoctor/environments/development');

module.exports = merge(prodEnv, {
  NODE_ENV: env.mode || '"development"',
  API_URL: env.apiHost || '"http://127.0.0.1:8000/api"'
});
