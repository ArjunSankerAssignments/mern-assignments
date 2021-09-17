const { response } = require('express');
const {Book} = require('../models/book');
const {ServiceError}= require('../utils/service-error');


class  BookService{

    constructor(){
        //bindMethods(this);   
        
        const functions=[ this.getAllAuthors, 
                          this.getAllBooks, 
                          this.addBook, 
                          this.getBookByIsbn, 
                          this.getBooksByAuthor,
                          this.getBooksByTag,
                          this.getBooksByTitle, 
                          this.removeBook,
                          this.updateBook,
                          this.search,
                          this.addReview,
                          this.getReviews
                        ];

        for(let f of functions){
            //console.log(f.name); 
            this[f.name] = f.bind(this);
        }
    }    

    async getAllBooks(){
        return await Book.find();
    }

    async getBookByIsbn({id}){
        
        let book=await Book.findOne({isbn:id});
        if(!book)
            throw new ServiceError(404, "Invalid Book Id", {isbn:id});
        else
            return book;       

    }

    async addBook({body}){
        try{
            let newBook= new Book(body);
            await newBook.save();
            return newBook;
        } catch(error) {

            throw new ServiceError(400, error.message, {error});

        }
    }

    async getAllTitles(){

        let books=await Book.find({},{title:true}).sort({title:1});
        let titles= books.map(book=>book.title);

        return titles;

    }

    async removeBook({id}){
        try{
        let book=await this.getBookByIsbn({id});
        await book.delete();
        }catch(e){
            console.log(e);
        }

    }

    async updateBook({id,body}){
         let book=await this.getBookByIsbn({id});
        return await Book.findOneAndUpdate({isbn:id},body);
    }
    async getAllAuthors(){
        return await Book.distinct('author');
    }
    async getBooksByAuthor({author}){
        const a= new RegExp(author,'i');
        console.log(a);
        return await Book.find({author_id:a})
    }

    async getBooksByTitle({title}){
        return await Book.find({title:/title/i})
    }

    async getBooksByTag({tag}){
        return await Book.find({tag:/tag/i})
    }

    async search({ q}){
        const a= new RegExp(q,'i');
        return await Book.find( { $text: { $search: a } })
    }

    async addReview({id, body}){
        let book = await this.getBookByIsbn({id:id});
        book.reviews.push(body);
        await this.updateBook({id:id, body:book});
    }

    async getReviews({id}){
        console.log(id);
        const book = await this.getBookByIsbn({id:id.trim()});
        return book.reviews;
    }

}

module.exports={BookService}