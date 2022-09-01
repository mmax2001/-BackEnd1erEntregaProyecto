const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const usersCollection='users';

const userSchema = new Schema({
    nombre: {type:String,require:true,max:100},
    apellido: {type:String,require:true,max:100},
    email: {type:String,require:true},
    },{timestamps:true});

const userData=model(usersCollection,userSchema);

module.exports={userData};
