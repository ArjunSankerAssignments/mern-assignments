import React, {useState}from 'react';
import {AuthorService} from '../services/author-service';
import AuthorEditor from './author-editor';

const Component = (props)=>{
    const [errors,setErrors]= useState(null, props);
    const author={
        id:'',
        name:'',
        photo:'',
        biography:''
        
    };

    return (
        <div>
            <h2>Add New Author</h2>
            <AuthorEditor author={author} error={errors} onSave={AuthorService.instance.addAuthor}/>
            
        </div>
    );
}

export default Component