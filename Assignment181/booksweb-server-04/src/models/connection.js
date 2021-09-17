require('dotenv').config();
const {DB_USER,DB_PASSWORD,DB_URL}=process.env;
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

//mongodb+srv://Arjun:<password>@cluster0.v50b1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


module.exports.connect= async()=>{
    console.log(DB_USER,DB_PASSWORD,DB_URL);
    await mongoose.connect(uri);
}