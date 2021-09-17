const request= require('supertest');
const {configureExpress}=require('../app');
const mongoose = require('mongoose');
const {Author} =require('../models/author');


describe('author api end point testings',()=>{

    const connectionString='mongodb://localhost:27017/testDb';
    const authorNames=['Vivek Dutta Mishra','Jeffrey Archer'];
    const makeId = str=>str.toLowerCase().split(' ').join('-');
    const app=configureExpress(__dirname);

    
   
    beforeAll(async()=>{
        await mongoose.connect(connectionString);
        //console.log("beforeAll called");
    });

    afterAll(()=>{
        mongoose.connection.close();
        //console.log('afterAll called');
    });

    const fillDummyData=async ()=>{
        
        for  (let name of authorNames){
            const id=makeId(name);
            let author=new Author({name, id, biography:`${name} is an author`, photo:`${id}.jpg`});
            await author.save();
        }
    }

    beforeEach(async ()=>{
       // console.log('before each called');
       await fillDummyData();
    });

    afterEach(async ()=>{
        // console.log('after each called');
        await Author.remove({}); //remove all authors
    });



    it('should get all authors from the server',async()=>{

        //make a reques to  /api/authors
        let response=await request(app)    //start  a test server
                            .get('/api/authors') ;  //and make get call

        console.log('response',response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);


    
        //expect we should get all our authors here
    });

    it('should get author by id for valid id',async ()=>{

        //make a request GET /api/author/id
        let validId= makeId(authorNames[0]);

        let response=await request(app).get(`/api/authors/${validId}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(authorNames[0]);



        //expect status to be 200

        //expect correct author returned


    });


    it('should get 404 for invalid user id',async()=>{

        //request : GET /api/authors/invalid-id
        const response= await request(app).get('/api/authors/invalid-id');

        expect(response.status).toBe(404);


        //expect status to be 404

        //expect content to be no such book

    });

    it('should return 401 for adding book without valid authorization token',async()=>{
        // request POST /api/authors

        let author={name:'John Grisham', id:'john-grisham',photo:'john.jpg',biography:'john grisham'};

        let response=await request(app)
                        .post('/api/authors')
                        .send(author);


        expect(response.status).toBe(401);
        //expect status to be 401
    });

    it('should return 201 for adding books with valid authorization token',()=>{
        // request POST /api/authors

        //expect status to be 401

    });

});