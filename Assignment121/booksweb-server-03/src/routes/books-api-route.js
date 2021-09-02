const express=require('express');
require('dotenv').config();
const {DB_USER,DB_PASSWORD,DB_URL1}=process.env;

const mongoose = require('mongoose');
const {BookModel} = require( '../../db/book');

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL1}?retryWrites=true&w=majority`;
const getRouter= ()=>{

   //console.log('setting up the routes');
   //console.log("Databse Path", dbPath);
    let router=express.Router();
  //  console.log(router);
    router  
        .route("/")     
        .get( async (request,response)=>{
            console.log('inside book list route');
            try{
                await mongoose.connect(uri);
                console.log('connected');
                let bookList = await BookModel.find({});
        
                console.log(bookList);
                //response.send(JSON.parse());
                response.send(bookList);
                mongoose.connection.close();
            }catch(err){
                console.log(err.message);
            }
        });


    router
    .route('/titles')
    .get( async (request,response)=>{

        try{
            await mongoose.connect(uri);
            console.log('connected');
            let bookList = await BookModel.find({});
            let newBookList = bookList.map(b=>b.title);
    
            console.log(newBookList);
            //response.send(JSON.parse());
            response.send(newBookList);
            mongoose.connection.close();
        }catch(err){
            console.log(err.message);
        }

    });

router
    .route('/:authorName')
    .get( async (request,response)=>{

        try{
            author = request.params.authorName.trim();
            await mongoose.connect(uri);
            console.log('connected');
            let bookList = await BookModel.find({"author" : author});
            //let newBookList = bookList.map(b=>b.title);
    
            console.log(bookList);
            //response.send(JSON.parse());
            response.send(bookList);
            mongoose.connection.close();
        }catch(err){
            console.log(err.message);
        }

    })

    return router;


};


module.exports=getRouter;

