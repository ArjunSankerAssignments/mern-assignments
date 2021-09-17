import {AuthorService} from "./author-service";
import { BookService } from "./book-service";
import * as ActionNames from "../store/actions";

export const changeState= async (dispatch, id, author)=>{
    if(!id){
        if(author){
            const authorList = await AuthorService.instance.getAllAuthors();
            dispatch({type:ActionNames.LIST_AUTHORS, payload:authorList});
        }else{
            const bookList = await BookService.instance.getAll();
            dispatch({type:ActionNames.LIST_BOOKS, payload:bookList});
        }
    }else{
        if(author){
            const selAuthor = await AuthorService.instance.getAuthorById(id);
            dispatch({type:ActionNames.AUTHOR_DETAILS, payload:selAuthor});
        }else{
            const selBook = await BookService.instance.getBookByIsbn(id);
            dispatch({type:ActionNames.BOOK_DETAILS, payload:selBook});
        }
    }
};