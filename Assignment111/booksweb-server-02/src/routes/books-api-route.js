const express=require('express');
const {writeDb, readDb, delDb}=require("../utils/dbHandler");

const getRouter= ()=>{

   //console.log('setting up the routes');
   //console.log("Databse Path", dbPath);
    let router=express.Router();
  //  console.log(router);
    router  
        .route("/")     
        .get( async (request,response)=>{
            console.log('inside book list route');
            let bookList = undefined;

            await readDb()
                .then(data=>bookList=JSON.parse(data))
                .catch(err=>console.log(err.message));

            //response.send(JSON.parse());
            response.send(bookList);
        })
        .post(async (request,response)=>{
            //response.send('Add new book');
            let newBook = request.body;

            await writeDb(newBook)
                .then(()=>console.log(`Added Book ${newBook.title} successfully`))
                .catch(err=>console.log(err.message));

            let len = 0;
            await readDb()
                .then(data=>len=JSON.parse(data).length)
                .catch(err=>console.log(err.message));

            response.send(`Sucessfully added new book Db length ${len}`);

        });


    router
    .route('/:id')
    .get( async (request,response)=>{

        let bookList = undefined;
        let id = request.params.id.trim();

        await readDb()
            .then(data=>bookList=JSON.parse(data))
            .catch(err=>console.log(err.message));
        
        let book = bookList.find(b=>b._id===id);
        response.send(book);

    })
    .put(async (request,response)=>{
        //response.send('Update book by id:'+request.params.id);
        let bookList = undefined;
        let id = request.params.id.trim();
        let bookDetails = request.body;

        await delDb(id)
            .then(()=>console.log(`Book with id: ${id} deleted`))
            .catch(err=>console.log(err.message));

        await writeDb(bookDetails)
            .then(()=>console.log(`Updated Book ${bookDetails.title} successfully`))
            .catch(err=>console.log(err.message));

        let len = 0;
        await readDb()
            .then(data=>len=JSON.parse(data).length)
            .catch(err=>console.log(err.message));

        response.send(`Sucessfully updated book ${bookDetails.title} Db length ${len}`);
        

    })
    .delete(async (request,response)=>{
        let id = request.params.id.trim();
        
        await delDb(id)
            .then(()=>console.log(`Book with id: ${id} deleted`))
            .catch(err=>console.log(err.message));  
            
        let len = 0;
        await readDb()
            .then(data=>len=JSON.parse(data).length)
            .catch(err=>console.log(err.message));
    
        response.send(`Sucessfully deleted book with id ${id} Db length ${len}`);
    });

    return router;


};


module.exports=getRouter;

