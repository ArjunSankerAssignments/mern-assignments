const express=require('express');
const authorService=require('../services/author-service');
const {handleRequest}=require('../utils/express-utils');
const {authenticate} =require('../services/user-service');




const getRouter= ()=>{

   //const bookController=new BookController();
   const service=authorService;


    let router=express.Router();
  //  console.log(router);
    router  
        .route("/")    
        .get(handleRequest(service.getAllAuthors))
        .post(authenticate,handleRequest(service.addAuthor));



  
    //---->  api/books/5555
    router 
    .route('/:id')
    .get(handleRequest(service.getAuthorById))
    .put(authenticate,handleRequest(service.updateAuthor))
    .delete(authenticate,handleRequest(service.removeAuthor));

  
  return router;


};


module.exports=getRouter;

