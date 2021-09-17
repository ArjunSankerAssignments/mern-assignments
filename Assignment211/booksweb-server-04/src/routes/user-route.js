const express=require('express');
const userService=require('../services/user-service');
const {handleRequest}=require('../utils/express-utils');


const getRouter=()=>{

    let router=express.Router();

    router
        .route("/")
        .get(userService.authorize("admin"),handleRequest(userService.getAllUsers))
        .post(handleRequest(userService.register));


    router
        .route("/login")
        .post(handleRequest(userService.login));


    return router;
}

module.exports=getRouter;
