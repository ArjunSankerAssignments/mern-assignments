const mongoose = require('mongoose');

const authors=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    id:{
        type: String,
        required: true
    },
    photo: String,
    biography: String
});

const Author= mongoose.model("Author", authors);

module.exports={
    Author
}