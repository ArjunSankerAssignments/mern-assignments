const request= require('supertest');
const {configureExpress}=require('../app');
const mongoose = require('mongoose');
const {Book} =require('../models/book');
const {register, login} = require('../services/user-service');
const { User } = require('../models/user');


describe('book api end point testings',()=>{

    const connectionString='mongodb://localhost:27017/testDb';
    const authorIds=['vivek-dutta-mishra','neil-gaiman', 'agatha-christie'];
    const bookTitles=['The Accursed God', 'Good Omens', 'And Then There Were None'];
    const bookPrices=[399,299,499];
    const makeIsbn = str=>str.toLowerCase().split(' ').join('-');
    const app=configureExpress(__dirname);

    const dummyUser = {
        name:'dummyUser',
        email:'dummy@User.com',
        password:'dummyPa**word'
    }
    let token=null;

    const fillDummyData=async ()=>{
        for(let i=0; i<authorIds.length; i++){
            let book = new Book({
                            title:bookTitles[i],
                            isbn:makeIsbn(bookTitles[i]),
                            author:authorIds[i],
                            price:bookPrices[i]
                        });
            await book.save();
        }
    }

    
   
    beforeAll(async()=>{
        await mongoose.connect(connectionString)
        token = await register({body:dummyUser});
        console.log("My Token", token);
    });

    afterAll(async ()=>{
        await User.remove({});
        mongoose.connection.close();
    });

    beforeEach(async ()=>await fillDummyData());

    afterEach(async ()=>await Book.remove({}));



    it('should get all books from the server',async()=>{

        let response=await request(app)
                            .get('/api/books') ;

        //console.log('response',response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(bookTitles.length);
    });

    it('should get book by ISBN for valid ISBN',async ()=>{

        let validISBN= makeIsbn(bookTitles[0]);

        let response=await request(app).get(`/api/books/${validISBN}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe(bookTitles[0]);

    });


    it('should receive 404 for invalid ISBN',async()=>{

        const response= await request(app).get('/api/books/invalid-Id');
        expect(response.status).toBe(404);
        //expect(response.error.text.message).toMatch(/Invalid Book Id/);
        //console.log("Response Error",response.error.details);
    });

    it('should return 401 for adding book without valid authorization token',async()=>{

        let book={title:'Dumb Witness', isbn:'dumb-witness',author:'Agatha Christie',price:150};

        let response=await request(app)
                        .post('/api/books')
                        .send(book);


        expect(response.status).toBe(401);
    });

    it('should return 201 for adding books with valid authorization token',async ()=>{

        let book={title:'Dumb Witness', isbn:'dumb-witness',author:'Agatha Christie',price:150};

        let response=await request(app)
                        .post('/api/books')
                        .set('Authorization', `BEARER ${token.token}`)
                        .send(book);


        expect(response.status).toBe(201);
        expect(response.body.title).toMatch(book.title);
        //console.log(response.body);

    });

});