const AuthorService =require( '../author-service.js')
const {Author}= require('../../models/author');
const mongoose = require('mongoose');
const { expect } = require('@jest/globals');


describe('AuthorService Tests',()=>{

    const connectionString='mongodb://localhost:27017/testdb';
    const authorNames=['Vivek Dutta Mishra','Jeffrey Archer'];

    const makeId = str=>str.toLowerCase().split(' ').join('-');
    
   
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
            let author=new Author({name, id:makeId(name)});
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



    it('should get all authors from the database', async()=>{    

        let authors=await AuthorService.getAllAuthors();
        expect(authors.length).toBe(2); 
        expect(authors[0].name).toBe(authorNames[0]);

    });

    it('should get author with correct id',async()=>{
        let id=makeId(authorNames[0]);
        let author=await AuthorService.getAuthorById({id});
        expect(author.id).toBe(id); 
        expect(author.name).toBe(authorNames[0]);
    });


    it('should throw error for author with invalid id',async()=>{        
        await expect(AuthorService.getAuthorById('wrong-id') ).rejects.toThrow(/Author not found/);
    });

    it('should throw error with status 404 with invalid id', ()=>{ 
        
        //A function that returns a Promise is just like an async function
        return AuthorService
                .getAuthorById('wrong id')
                .catch(error=>{ 
                    expect(error.status).toBe(404);
                });

    });

    it('should add an author with valid fields',async()=>{

        const name='John Grisham';
        const id=makeId(name);
        const photo=`${id}.jpg`;
        const biography=`${name} is a famous author`;

        const response= await AuthorService.addAuthor({body:{name,id,photo,biography}});

        expect(response.id).toBe(id);
        expect(response._id).not.toBeUndefined();
        expect(response.name).toBe(name);


    });

    it('should throw error with missing key name', ()=>{

        const name='John Grisham';
        const id=makeId(name);


        return AuthorService
                .addAuthor({body:{name,id}})
                .catch(error=>{
                    expect(error.status).toBe(400);
                    expect(error.details.missingKeys).toHaveLength(2);
                    expect(error.details.missingKeys).toContain('photo');
                    expect(error.details.missingKeys).toContain('biography');
                });

    });


});