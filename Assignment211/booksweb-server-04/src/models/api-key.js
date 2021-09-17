const mongoose= require('mongoose');

const apiKeySchema = new mongoose.Schema({

    domain:{
        type:String, 
        required:true, 
        unique:true
    },

    apiKey:{
        type:String, 
        required:true, 
        unique:true
    },

    requestCount:Number

   

});

module.exports.ApiKey= mongoose.model('ApiKey',apiKeySchema);