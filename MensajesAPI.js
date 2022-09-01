//const fs = require('fs');
import { promises as fs } from 'fs'

//Declaro la clase Contenedor con los metodos requeridos


class MensajesAPI{
    constructor(fileName){
        this.rutaArchivo=`${fileName}.txt`;
        this.mensajes=[];
    }

    async leerArchivoAsync() {
        //const fs = require('fs');
        try {
            let contenido = await fs.readFile(this.rutaArchivo,'utf-8');
            this.mensajes=contenido;
            //console.log(this.productos);
            return contenido;
        }
        catch(err){
           const mensajesArray = []
           await fs.writeFile(this.rutaArchivo, JSON.stringify(mensajesArray))
           return mensajesArray           
        }
    }

    async save(newObject){

        try {
            await this.leerArchivoAsync();
            let newID;
            let msgs=[];
            if (this.mensajes.length === 0) {
                newID=1;
            } else {
                msgs=JSON.parse(this.mensajes||'{}');
                newID=(msgs[msgs.length-1].id)+1; 
            }
            const objToAdd = {...newObject,id:newID};  
            msgs.push(objToAdd);        
            await fs.writeFile(this.rutaArchivo, JSON.stringify(msgs,null,3)) //null para no reemplazar el contenido y 3 por el espacio entre lineas
            return newID;                
        }
        catch (error) {
            console.log(error)
            return error
        }       
    }

    async getById(ID){

        try{
            await this.leerArchivoAsync();
            let msgs=JSON.parse(this.mensajes||'{}');
            if(productos.length>0){                     
                const msgToFind=msgs.filter(msg=>msg.id===ID);                
                if(msgToFind.length){
                    console.log("EL CONTENIDO DEL MENSAJE ES ",msgToFind);
                    return msgToFind;
                }
                else{
                    return null;
                }
            }
            return null  
        } 
        catch (error) {
            console.log(error)    
        }
    }

    async getAll(){

        try {
            await this.leerArchivoAsync();
            //return this.mensajess;
            return JSON.parse(this.mensajes||'{}');    
        } 
        catch (error) {
           console.log(error)  
        }
        
    }

    async deleteById(ID){
        
        try{
            await this.leerArchivoAsync();
            let msgs=JSON.parse(this.mensajes||'{}');     
            const indexOfID=msgs.findIndex(msg=>{return msg.id==ID});
            console.log(indexOfID);
            if(indexOfID!=-1) {
                const msgToFind=msgs.filter(msg=>msg.id!=ID);
                await fs.writeFile(this.rutaArchivo, JSON.stringify(msgToFind))
                console.log(`Se borro exitosamente el mensaje con id : ${ID}`)
            }
            else{
                 console.log("No se encuentra el ID");
            }
        }
        catch (error){
            console.log(error)
        }    

    }

    async deleteAll(){
        
        try {
            await fs.writeFile(this.rutaArchivo,"");
            console.log("Contenido borrado correctamente");
        } catch (error) {
            console.log(error)
        }
    }

}
export default MensajesAPI
//module.exports = MensajesAPI

  // { 
        //     author: {
        //         id: 'mail del usuario', 
        //         nombre: 'nombre del usuario', 
        //         apellido: 'apellido del usuario', 
        //         edad: 'edad del usuario', 
        //         alias: 'alias del usuario',
        //         avatar: 'url avatar (foto, logo) del usuario'
        //         },
        //     text: 'mensaje del usuario'
        // }

// let testMsg1={                                                                                                                                                    
//         msgName: 'fulanito@gmail.com',                                                                                                                                              
//         msgText: 'Hola',                                                                                                                                     
//         msgTime:''                                                                                                                               
//     };                                                                                                                                                    

// let testMsg2={
//         msgName:"menganito@gmailcom",
//         msgText:'Como va?',
//         msgTime:''            
//     };

// const prueba = async () => {

//     const testContenedor = new MensajesAPI("mensajes");

//     //Pruebo la lectura del archivo
//     await testContenedor.leerArchivoAsync();
//     console.log("El contenido del archivo es : ", testContenedor.mensajes);

//     //Pruebo obtener todos los productos
//     let contentFile = await testContenedor.getAll();
//     console.log("Los elementos del archivo son : ",contentFile);
    
//     //Pruebo guardar en el archivo el objeto tesMsg1
//     let msgSave1 = await testContenedor.save(testMsg1);
//     console.log(msgSave1)
//     let msgSave2 = await testContenedor.save(testMsg2);
//     console.log(msgSave2)

//     //Pruebo obtener el id del mensaje #2
//     // let msgByID = await testContenedor.getById(12);
//     // console.log("El elemento con el ID buscado es : ",msgByID);


//     // //Pruebo borrar el objeto con ID 3
//     // let deleteProdByID=await testContenedor.deleteById(3);
//     // console.log(deleteProdByID);

//     // // //Pruebo borrar todos los productos del archivo
//     // let resultDelete= await testContenedor.deleteAll();
//     // console.log(resultDelete);

// };

// prueba();