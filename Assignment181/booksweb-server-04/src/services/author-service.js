const {Author} = require('../models/author');
const {ServiceError}= require('../utils/service-error');

class AuthorService{
    constructor(){

        const functions=[ 
            this.getAllAuthors,  
            this.addAuthor, 
            this.getAuthorById,
            this.deleteAuthor,
            this.updateAuthor
          ];

        for(let f of functions)
            this[f.name] = f.bind(this);

    }

    async getAllAuthors(){
        return await Author.find();
    }

    async getAuthorById({id}){
        
        let author=await Author.findOne({id:id});
        if(!author)
            throw new ServiceError(404, "Invalid Author_id:", {id});
        else
            return author;       

    }

    async addAuthor({body}){
        try{
            let newAuthor= new Author(body);
            await newAuthor.save();
            return newAuthor;
        } catch(error) {

            throw new ServiceError(400, error.message, {error});

        }
    }

    async updateAuthor({id,body}){
        let author=await this.getAuthorById({id});
        console.log(author);
        console.log(body);
        await Author.findOneAndUpdate({id:id},body);
        return true;
   }

   async deleteAuthor({id}){
        try{
            let author=await this.getAuthorById({id});
            await author.delete();
        }catch(e){
            console.log(e);
        }

    }
}

module.exports={
    AuthorService
}