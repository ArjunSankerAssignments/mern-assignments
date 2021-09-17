const mongoose= require('mongoose');

const authorSchema = new mongoose.Schema({

   
    name:{
        type:String, 
        required:true
    },
    
    id:{
        type:String, 
        required:true
    },

    photo:{
        type:String, 
        
    },

    biography:String,
    tags:[String]

});

module.exports.Author= mongoose.model('Author',authorSchema);