import express from 'express';
import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'
import handlebars from 'express-handlebars';
import { Router } from 'express';
import ContenedorAPI from './ContenedorAPI.js';
import MsjsAPI from './MensajesAPI.js';
import { productosLista } from './datasets/productosLista.js';
import {mensajesLista} from './datasets/mensajes.js';
import { productosFaker } from './indexFaker.js';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import viewsRouter from './src/routes/views.router.js';


import { knexMySql } from './options/mariaDB.js';
import { knexSqLite } from './options/mySqlite3.js';
import { createTable,createMessagesTable } from './createTable.js';
import __dirname from './utils.js'
import SqlContainer from './SqlContainer.js';

// const SqlContainer = require('./SqlContainer.js');

// const { sessionRouter } = require('./src/routes/session.router.js');

const app = express();
const router=Router();

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

app.use('/', router);
app.use('/login',viewsRouter);

//app.use('/api/sessions',sessionRouter);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

router.use(express.json());
router.use(express.urlencoded({ extended: true }))

//Lineas para Handlebars
app.engine('hbs', handlebars.engine(
    {
       extname:'.hbs',
       //defaultLayout:'layout.hbs',
       layoutsDir:__dirname + '/public/layouts/views/',
    }
)
);
app.set('view engine', 'hbs');
app.set('views',__dirname+ '/public/layouts/views');


const productos=productosFaker;
const title='Faker';
app.get('/api/productos-test',(req,res)=>{
    //res.send(productosFaker);
    res.render('layout',{productos,title})
})

//Indico que quiero cargar los archivos estaticos que se 
//encuentran en dicha carpeta
app.use(express.static('./public'))

//Inicializo las tablas dentro de las bases MySQL y SQLite
const initializeDB = async () => {
   await createTable(knexMySql);
   await createMessagesTable(knexSqLite);
}

initializeDB();

//Configuro el medio de almacenamiento para los productos y mensajes
//del chat ya sea usando memoria y archivo o base de datos
const dataBaseSupport = false;
let ContenedorProductos;
let ChatMsjs;
if(dataBaseSupport) {
   ContenedorProductos = new SqlContainer(knexMySql,"productos");
   ChatMsjs=new SqlContainer(knexSqLite,"mensajes");
} else {
   ContenedorProductos= new ContenedorAPI();
   ContenedorProductos.prodListAPI=productosLista;
   ChatMsjs= new MsjsAPI('mensajes');
}


// let mongoURL='mongodb+srv://test:<password>@cluster0.flm7x.mongodb.net/?retryWrites=true&w=majority'
//const connection=mongoose.connect('mongodb+srv://test:1234@cluster0.flm7x.mongodb.net/?retryWrites=true&w=majority')
// // app.get('/dashboard',(req,res)=>{
// //     res.send(dashboard);
// // })








//configuro la conexion para enviar mensajes desde el servidor al cliente 
//con el nombre del evento 'connection' y una funcion de callback
io.on('connection',async (socket)=>{
    console.log('Cliente conectado')
    // socket.emit('mi mensaje','Este es mi mensaje desde el servidor')
    
    //Cargo la lista de productos inicialmente
    socket.emit('listadoProductos',await ContenedorProductos.getAll());
    socket.emit('listadoFaker',productosFaker);

    //Recibo la carga de productos desde un cliente y la
    //emito a todos los demas clientes
    socket.on('ingresoProducto', product => {
        ContenedorProductos.save(product)
        io.sockets.emit('listadoProductos', ContenedorProductos.getAll());
    })
    
    //Cargo los mensajes previos
    socket.emit('mensajes', await ChatMsjs.getAll());
    //socket.emit('mensajes',listaMensajes); USANDO SQLITE
    
    //Muestro los nuevos mensajes
    socket.on('ingresoMensaje', async mensaje => {        
        await ChatMsjs.save(mensaje)
        io.sockets.emit('mensajes', ChatMsjs.getAll());
    })
    
})

//Dejo el servidor configurado en el puerto 3000
const PORT=3000
const server=httpServer.listen(PORT,()=>console.log('SERVER ON'));
server.on("error",error=>console.log(`Error en el servido ${error}`))
