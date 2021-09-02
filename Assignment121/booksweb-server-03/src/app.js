const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const getBookRouter=require('./routes/books-api-route');

const getUserRouter=require("./routes/login-api-routes");


function configureExpress(basePath){
    const app=express();   
    app.use(bodyParser.json());
    app.use(express.static(path.join(basePath, 'public')));  

    //console.log(getBookRouter);
    //console.log(getBookRouter());
    
    app.use('/api/books', getBookRouter());
    app.use("/api/users", getUserRouter());

    return app; 
};

module.exports={
    configureExpress
};