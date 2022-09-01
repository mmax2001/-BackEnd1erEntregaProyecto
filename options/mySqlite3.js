import knex from 'knex'

export const knexSqLite = (knex)({
  client: 'sqlite3',
  connection: {
      filename: './DB/ecommerce.sqlite'
  },
  useNullAsDefault: true
})


//module.exports = { knexSqLite };