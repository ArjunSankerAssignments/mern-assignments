import http from './http';

const url = 'http://localhost:5000/api/authors/';

export class AuthorService {
    static instance  = new AuthorService();

    getAllAuthors= async()=>{
        try {
            let response=await  http.get('authors'); 
            //console.log('response',response);
            return response.data;
        } catch (error) {
            console.log('error', error);
            return null;
        }
    }

    addAuthor = async (author) => {
        try{
            let response= await http.post('authors',author);
            return {success:true, data:response.data};

        }catch(error){
            console.log('error posting data', error);
            return {success:false, error:error};
        }
    }    
    
    async update(author) {
        const id = author.id;
        try{
            let response=await http.put(url+id,author);
            return {success:true,data:response};
        }catch(error){
            return {success:false, error:error};
        }
    }

    getAuthorById = async (id) => {
        try{
            
            let response= await http.get(url+id);
            //console.log('author by id ', response.data);
            return response.data;
        }catch(error){
            console.log('error fetching book by isbn',error);
            return undefined;
        }
    }

}