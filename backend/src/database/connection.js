const knex = require('knex');
const configuration = require('../../knexfile');

const config = configuration.development;

const connection = knex(configuration.development);

module.exports = connection;