// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'paiva',
      password : '21211345',
      //O banco "polimerize" deve existir no MySQL.
      database : 'polimerize'
    },
    migrations: {
      directory: './src/database/migrations',
    },
  },

  staging: {},

  production: {}

};
