const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const getBookRouter=require('./routes/books-api-route');
//const getOldBookRouter=require('./routes/books-api-route-old');
const getUserRouter=require('./routes/user-route');


function configureExpress(basePath){
    //console.log(path.join(basePath, 'public'));
    const app=express();
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(basePath, 'public')));
    app.set('view engine','ejs');
    app.set('views', path.join(basePath, 'src','views'));

    //console.log(getBookRouter);
    //console.log(getBookRouter());
    
    //app.use('/api/v1/books', getOldBookRouter());
    app.use('/api/books', getBookRouter());
    app.use('/api/users', getUserRouter());

    return app; 
};

module.exports={
    configureExpress
};