// const {productosLista} = require('./datasets/index.js')
// const {mensajes} = require('./datasets/index.js')
// const {knexMySql} = require('./options/mariaDB');
// const {knexSqLite} = require('./options/mySqlite3');
import { productosLista } from './datasets/productosLista.js';
import { mensajesLista } from './datasets/mensajes.js';
import { knexMySql } from './options/mariaDB.js';
import { knexSqLite } from './options/mySqlite3.js';

const addDatasets = async (knexConnector, data, tableName) => {
  await knexConnector.insert(data).into(tableName);
};


const createTable = async (knexMySql) => {

  try {
    const tableExist = await knexMySql.schema.hasTable("productos");
    console.log("LA TABLA ESTA EN :",tableExist)
    if (tableExist) {
      console.log('La tabla ya ha sido creada');
      return;
    }else{
      await knexMySql.schema.createTable("productos", (table) => {
        table.increments('id').primary();
        table.string("title");
        table.integer("price");
        table.string("thumbnailURL");
      });
  
      await addDatasets(knexMySql,productosLista, "productos");
    }

  } catch (error) {
    console.error(error);
  }

}

const createMessagesTable = async (knexSqLite) => {
  try {
    const tableExist = await knexSqLite.schema.hasTable("mensajes");
    if (tableExist) return;

    await knexSqLite.schema.createTable("mensajes", (table) => {
      table.increments("id");
      table.string("email");
      table.integer("text");
      table.string("timestamp");
    });

    await addDatasets(knexSqLite, mensajes, "mensajes");
  } catch (error) {
    console.error(error);
  }
};

//createTable();
//createMessagesTable();
// createTable(knexMySql);
// createMessagesTable(knexSqLite);
export {createTable,createMessagesTable}
//module.exports = {createTable,createMessagesTable}