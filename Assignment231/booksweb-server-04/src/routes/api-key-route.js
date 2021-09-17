const express=require('express');
const {authorize} = require('../services/user-service');
const apiKeyService=require('../services/api-key-service');
const {handleRequest}=require('../utils/express-utils');


const getRouter=()=>{

    let router=express.Router();

    router
        .route("/")
        .get(authorize("admin"),handleRequest(apiKeyService.listApiKeys))
        .post(handleRequest(apiKeyService.generateApiKey));


    return router;
}

module.exports=getRouter;
