const {Author} =require('../models/author');
const { ServiceError, checkRequired, validate } = require('../utils/service-error');



const addAuthor=async({body})=>{

    checkRequired(body,"name","id","photo","biography");
    let author= new Author(body);
    const result=await author.save();
    return result;
}

const getAllAuthors= async ()=>{

    return await Author.find();
} 

const getAuthorById=async({id})=>{
    console.log('getting author by Id',id);
    const author=await Author.findOne({id});
    if(!author) 
        throw new ServiceError(404, "Author not found",{id});
    else
        return author;
}

const updateAuthor=async ({body,id})=>{

    console.log('searching author by id',id);
    let author=await getAuthorById({id}); 
    console.log('author',author);
    author.biography=body.biography;
    author.photo=body.photo;
    await author.save();
    let updatedAuthor=await getAuthorById({id});
    console.log('updated author',updatedAuthor);

    return updatedAuthor;

}

const removeAuthor=async({id})=>{
    let author=await getAuthorById(id);
    await author.remove();
}

module.exports={
    addAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    removeAuthor
}