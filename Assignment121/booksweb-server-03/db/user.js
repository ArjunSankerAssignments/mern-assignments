const mongoose = require('mongoose');

const users = mongoose.Schema({
    _id:{
        type:mongoose.ObjectId,
        auto:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:Number,
        required:true
    }
});

const UserModel= mongoose.model('users', users);

module.exports={
    UserModel
}