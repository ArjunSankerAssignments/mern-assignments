import { contains, copyObject, delay } from '../utils/core';
import http from './http';
//import axios from 'axios';
const url = 'http://localhost:5000/api/books/';



export class BookService {

    static instance = new BookService();

    
    getAll=async ()=>{
        try{
            //TODO: your await logic here
            // let response= await axios.get(url,{oo
            //     headers:{
            //         "x-api-key":"LET ME PASS"                    
            //     }
            // });

            let response=await  http.get('books'); //http://localhost:5000/api/books
            //console.log('response',response);
            return response.data;
            
        }catch(error){
            console.log('error',error);
            return null;
        }
    };

    _getAll = async () => {
        try {
            let response = await fetch(url,{
                headers:{
                    api_key:"LET ME PASS"
                }
            });
            console.log('response', response);
            if (response.status !== 200) {
                console.error('http error', response.status);
                return [];
            }
            let books = await response.json();
            return books;
        } catch (error) {
            console.log('error', error);
            return null;
        }
    }


    addBook = async (book) => {
        try{
            //let response=await axios.post(url,book);            
            let response= await http.post('books',book);
            return {success:true, data:response.data};

        }catch(error){

            console.log('error posting data', error);
            return {success:false, error:error};
        }
    }

    update=async (book) =>{
        //TODO: COMPLETE THIS WORK!
        
        const isbn=book.isbn;
        console.log('trying to update ', book);
        try{
            let response=await http.put(`/books/${isbn}`,book);
            console.log('response',response);
            return {success:true,data:response};
        }catch(error){
            console.log('typeof error',typeof error);
            return {success:false, error:error};
        }
    }

    getBookByIsbn = async (isbn) => {
        try{
            //let response=await axios.get(`${url}/${isbn}`);
            let response= await http.get(`books/${isbn}`);
            console.log('book by isbn', response.data);
            return response.data;
        }catch(error){
            //console.log('error fetching book by isbn',error);
            return undefined;
        }
    }

    removeBook = async (isbn) => {
      //TODO: IMPLEMENT THE REMOVE BOOK
      try{
        console.log('deleting in service',isbn);
        await http.delete(`books/${isbn}`);
        console.log('book deleted successfully',isbn);
        return {success:true};
      }catch(error){
        console.log('error deleting book',error);
        return {success:false, error:error};
      }
    }



    

    getBooksByAuthor = (author) => {
        return [];
    }

    getBooksByTitle = (title) => {
        return [];
    }

    

}