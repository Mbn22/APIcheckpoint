const mongoose= require("mongoose");
const  UserShema = mongoose.Schema({
    name : {type : String , required : true} ,
    age : Number ,
    job : String
}) ; 
 
module.exports = mongoose.model('User',UserShema);