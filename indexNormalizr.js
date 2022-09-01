const { normalize, schema } = require('normalizr')
const MsjsAPI = require('./MensajesAPI.js')

//Obtengo los datos del archivo de mensajes 
//para luego procesarlos con normalizr???
Chats=new MsjsAPI('mensajes');
const mensajesData={
    id:'mensajes',
    mensajes:[]
};
const readData=async()=>{    
    chatsData=await Chats.getAll();
    mensajesData.mensajes.push(chatsData);
    console.log("ESTO TIENE :",chatsData)
    console.log("ESTO TIENE EL ARRAY",mensajesData.mensajes)
    const authorSchema=new schema.Entity('authors');
    const textSchema=new schema.Entity('texts');
    const mensajesSchema=new schema.Entity('mensajes',{
        author:authorSchema,
        text:textSchema
    })
    
    const normalizedObject=normalize(mensajesData.mensajes,mensajesSchema);
    console.table(JSON.stringify(normalizedObject,null,'\t'))
}
readData();
