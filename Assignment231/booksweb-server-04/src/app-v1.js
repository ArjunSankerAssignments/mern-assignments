const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const getBookRouter = require('./routes/books-api-route');
const getOldBookRouter = require('./routes/books-api-route-old');
const getUserRouter = require('./routes/user-route');
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
    //console.log('request.headers',request.headers);
   
    response.setHeader("Access-Control-Expose-Headers","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    response.setHeader("Access-Control-Allow-Origin",request.headers.origin);   
    //console.log('request.headers["x-api-key"]',request.headers["x-api-key"]);
    const apiKey = request.headers["x-api-key"];
    console.log('apiKey', apiKey);
    if(apiKey==="LET ME PASS" ){        
        console.log(request.method,'access control origin allowed');
        response.setHeader("Access-Control-Allow-Origin",request.headers.origin);
    } else{
       
        if(request.method!=="OPTIONS"){
            console.log("invalid/missing API Key. removing permission");
            
            response.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
           
           //response.removeHeader("Access-Control-Allow-Origin");
           
           
            
        } else {
            console.log("OPTIONS Request");
        }
    }
    
    next();
   
}

function configureExpress(basePath) {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static(path.join(basePath, 'public')));

    //Middleware to allow CORS
    // app.use((request,response,next) =>{
    //     //console.log('request.headers',request.headers);
    //     let apiKey=request.headers.api_key;
    //     if(true)  
    //         //allow whichever origin is making the request.
    //         response.setHeader("Access-Control-Allow-Origin",request.headers.origin);
    //     next();
    // });

    
    //configureCORS(app);

    //app.use(cors()); //allow all requests

    app.use(apiKeyCors)

    // app.options("*", (request,response,next)=>{
    //     console.log("option request",request.headers);
    //     response.setHeader("Access-Control-Allow-Origin",request.headers.origin);
       
    //     response.setHeader("Access-Control-Expose-Headers","*");
        
    //     response.status(200).send();
    // });



    //console.log(getBookRouter);
    //console.log(getBookRouter());

    app.use('/api/v1/books', getOldBookRouter());
    app.use('/api/books', getBookRouter());
    app.use('/api/users', getUserRouter());

    return app;
};

module.exports = {
    configureExpress
};