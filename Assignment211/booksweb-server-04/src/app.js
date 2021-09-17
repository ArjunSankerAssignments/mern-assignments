const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getBookRouter = require('./routes/books-api-route');
const getOldBookRouter = require('./routes/books-api-route-old');
const getUserRouter = require('./routes/user-route');
const {verifyToken} =require('./services/user-service');
const getApiKeyRouter= require('./routes/api-key-route');
const cors = require('cors');


function configureCORS(app) {
    let api_key=null;
   
    //checks if request.header has api_key
    app.use((request,response,next)=>{
        console.log(request.headers);
        if(request.headers.api_key){
            api_key=request.headers.api_key;
            console.log('api_key',api_key);
        } else {
            console.log('no api_key in the header');
        }
        response.header("Access-Control-Allow-Headers", "*");        
        response.header("Access-Control-Allow-Method", "*");        
        next();
    });

    const allowedOrigin= origin =>{
        return api_key==="LET ME PASS";
    }

    var corsOptions = {
        origin: function (origin, callback) {
            if(allowedOrigin(origin))
                callback(null,true);
            else
                callback(new Error("NOT allowed by CORS"));
        }
    };



    app.use(cors(corsOptions));
    

}

function apiKeyCors(request,response,next){
    
   
    response.setHeader("Access-Control-Expose-Headers","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    response.setHeader("Access-Control-Allow-Origin",request.headers.origin);   
    
    const apiKey = request.headers["x-api-key"];
    
    if(apiKey==="LET ME PASS" ){        
    
        response.setHeader("Access-Control-Allow-Origin",request.headers.origin);
    } else{
       
        if(request.method!=="OPTIONS"){
            response.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
        } else {
            console.log("OPTIONS Request");
        }
    }
    
    next();
   
}

function corsAll(request,response,next){
    response.setHeader("Access-Control-Expose-Headers","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    response.setHeader("Access-Control-Allow-Origin","*"); 
    response.setHeader("Access-Control-Allow-Methods","*");

    next();
}

function configureExpress(basePath) {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static(path.join(basePath, 'public')));

    //app.use(apiKeyCors)
    app.use(verifyToken);  //this middleware add user
    app.use(corsAll);
    

   
    app.use('/api/v1/books', getOldBookRouter());
    app.use('/api/books', getBookRouter());
    app.use('/api/users', getUserRouter());
    app.use('/api/key',getApiKeyRouter());

    return app;
};

module.exports = {
    configureExpress
};