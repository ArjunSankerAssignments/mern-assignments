const express=require('express');
const {AuthorService}=require('../services/author-service');
const {handleRequest}=require('../utils/express-utils');
const {BookService} = require("../services/book-service");

const getRouter=()=>{

    let router=express.Router();

    const authorService = new AuthorService();
    const bookService = new BookService();

    router
        .route("/")
        .get(handleRequest(authorService.getAllAuthors))
        .post(handleRequest(authorService.addAuthor));

    
    router
        .route("/:id")
        .get(handleRequest(authorService.getAuthorById))
        .put(handleRequest(authorService.updateAuthor))
        .delete(handleRequest(authorService.deleteAuthor));

    router  
        .route("/:id/books")
        .get(async (req, res)=>{
            console.log(req.params.id);
            const reqAuthor = await authorService.getAuthorById({id:req.params.id.trim()});
            console.log(reqAuthor);
            const bookList = await bookService.getBooksByAuthor({author:reqAuthor.id});

            res.json(bookList);
        })

    return router;
};

module.exports=getRouter;