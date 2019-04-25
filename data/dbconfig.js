const knex = require('knex');
const config = require('../knexfile');
const environment = process.env.DB_ENV || 'production';

module.exports = knex(config[environment]);
