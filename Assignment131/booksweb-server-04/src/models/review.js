const mongoose = require('mongoose');

const reviews = mongoose.Schema({
   
    title: String,
    isbn:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        maX:5
    },
    comment: String
});

const Review= mongoose.model('Review', reviews);

module.exports={
    Review
}