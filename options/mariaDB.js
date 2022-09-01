import knex from 'knex'
export const knexMySql = (knex)({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port:3306,
    user : 'root',
    password : '',
    database : 'mi_tienda'
  }
});

//module.exports = {knexMySql}
