const mongoose = require('mongoose');


const review=mongoose.Schema({
    name:String,
    comment:String,
    rating:Number
});

const books = mongoose.Schema({
   
    title: String,
    isbn:{
        type:String,
        required:true
    },
    author_id:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:String,
    tags:{
        type:Array,
        required:false
    },
    reviews:[review],
    cover:String
});

const Book= mongoose.model('Book', books);

module.exports={
    Book
}