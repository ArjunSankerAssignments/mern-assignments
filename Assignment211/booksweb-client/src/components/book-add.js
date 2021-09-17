import React, {useState}from 'react';
import BookEditor from './book-editor'
import {BookService} from '../services/book-service';
import {withRouter} from 'react-router-dom';


const Component=(props)=>{

    //console.log(props);
    const [errors,setErrors]= useState(null, props);

    const book={
        isbn:'',
        title:'',
        author:'',
        price:0,
        description:'',
        cover:''
    };

    const handleSave=async (book)=>{
       
        const result=await BookService.instance.addBook(book);
       
        if(result.success)
            props.history.push('/book/list'); //goto /book/list
        else{
            const _errors= result.error.response.data.error.errors;
            setErrors(_errors);
        }
    };

    return (
        <div>
            <h2>Add New Book</h2>
            <BookEditor book={book} error={errors} onSave={BookService.instance.addBook}/>
            
        </div>
    );
};


export default withRouter(Component);