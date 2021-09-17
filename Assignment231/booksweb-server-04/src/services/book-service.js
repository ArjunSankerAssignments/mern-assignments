
const { Book } = require('../models/book');
const { ServiceError } = require('../utils/service-error');

require('dotenv').config();

// function bindMethods(object) {
//     console.log('started binding...', object);
//     for (let prop in object) {
//         let propValue = object[prop];
//         console.log('prop', prop);
//         if (typeof (propValue) === 'function') {
//             console.log('binding', propValue);
//             propValue.bind(object);
//         }
//     }
// }

class BookService {

    constructor() {
        //bindMethods(this);   

        const functions = [this.getAllAuthors,
        this.getAllBooks,
        this.addBook,
        this.getBookByIsbn,
        this.getBooksByAuthor,
        this.getBooksByTag,
        this.getBooksByTitle,
        this.removeBook,
        this.updateBook,
        this.search
        ];

        for (let f of functions) {
            //console.log(f.name); 
            this[f.name] = f.bind(this);
        }
    }

    async getAllBooks() {

            return await Book.find();
            
    }

    async getBookByIsbn({ id }) {

        let book = await Book.findOne({ isbn: id });
        if (!book)
            throw new ServiceError(404, "Invalid Book Id", { isbn: id });
        else
            return book;

    }

    async addBook({ body }) {
        try {
            //console.log('adding book',body);
            // let existing= Book.findOne({isbn:body.isbn});
            // if(existing){
            //     throw new  ServiceError(400,"Duplicate ISBN",{isbn});
            // }

            let bookData = { ...body };
            //console.log('bookData', bookData);
            let newBook = new Book({ ...body });
            //console.log('new book', newBook);
            await newBook.save();
            return newBook;
        } catch (error) {
            console.log('error saving', error);
            if (error.constructor.name === "ServiceError")
                throw error;
            else
                throw new ServiceError(400, error.message, { error });
        }
    }

    async getAllTitles() {

        let books = await Book.find({}, { title: true }).sort({ title: 1 });
        let titles = books.map(book => book.title);

        return titles;

    }

    async removeBook({ id }) {
        try {
            console.log('trying to remove book', id);
            let book = await this.getBookByIsbn({ id });
            await book.delete();
        } catch (e) {
            console.log(e);
        }

    }

    async updateBook({ id, body }) {
        let book = await this.getBookByIsbn({ id });
        await Book.findOneAndUpdate({ isbn: id }, body);
        return await Book.findOne({ isbn: id });
    }
    async getAllAuthors() {
        return await Book.distinct('author');
    }
    async getBooksByAuthor({ author }) {
        const a = new RegExp(author, 'i');
        return await Book.find({ author: a })
    }

    async getBooksByTitle({ title }) {
        return await Book.find({ title: /title/i })
    }

    async getBooksByTag({ tag }) {
        return await Book.find({ tag: /tag/i })
    }

    async search({ q }) {
        const a = new RegExp(q, 'i');
        return await Book.find({ $text: { $search: a } })
    }

}

module.exports = { BookService }