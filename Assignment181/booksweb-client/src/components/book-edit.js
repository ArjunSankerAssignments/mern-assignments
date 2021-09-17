import React, {useState,useEffect} from 'react';
import BookEditor from './book-editor'
import {BookService} from '../services/book-service';
import {useParams, useHistory} from 'react-router-dom';
import Loading from './loading';
import NotFound from './not-found';


const Component=(props)=>{

    console.log('props',props);
    const[book,setBook]=useState(null);

    const {isbn}=useParams();
    console.log('isbn',isbn);

    const history=useHistory();
    const [errors,setErrors]= useState(null, props);
    
    useEffect(()=>{
        BookService.instance.getBookByIsbn(isbn).then(setBook);
    })

    if(book===null){
        return <Loading/>
    }

    if(book===undefined){
        return <NotFound title="Book Not Found" message={`Missing isbn: ${isbn}`}/>
    }

    const handleSave=async (book)=>{
        
        const result= await BookService.instance.update(isbn,book);
        if(result.success)
            history.push('/book/list'); //goto /book/list
        else{
            const _errors= result.error.response.data.error.errors;
            setErrors(_errors);
        }
    };

    return (
        <div>
            <h2>Edit Info</h2>
            <BookEditor book={book} error={errors} onSave={BookService.instance.update}/>
        </div>
    );
};


export default Component;