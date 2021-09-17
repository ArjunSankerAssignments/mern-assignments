const mongoose = require('mongoose');


const review=mongoose.Schema({
    name:String,
    comment:String,
    rating:Number
});

const books = mongoose.Schema({
   
    title: {type:String, required:true},
    isbn:{
        type:String,
        required:true
    },
    author:{
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
},{
    //collection: 'booksdb'  //--> if our collection name is different from assumed collection name based on Model name
});

//Mongoose by default assumes that collection name will be lower case plural of model name supplied
// Book --> books
const Book= mongoose.model('Book', books);

module.exports={
    Book
}