import React, {useState}from 'react';
import {LabeledInput,LabeledTextArea} from './input-controls';
import ValidationErrors from './validation-errors';
import {useHistory} from 'react-router-dom';


const BookEditor=(props)=>{

    const [book,setBook]=useState(props.book);
    const [errors,setErrors]= useState(null, props);
    const history=useHistory();

    // const handleSave=(e)=>{
    //     e.preventDefault();
    //     //console.log('book',book);
    //     props.onSave(book);
        
    // }

    const handleSave=async(e)=>{
        e.preventDefault();
        const result= await props.onSave(book);
        if(result.success)
            history.push('/book/list'); //goto /book/list
        else{
            const _errors= result.error.response.data.error.errors;
            setErrors(_errors);
        }        
    }

    

    const handleChange=(id,value)=>{
        book[id]=value;
        setBook({...book});
    }

    return (
        <form>
            <LabeledInput value={book.isbn} id='isbn' placeholder="ISBN" onChange={handleChange} />
            <LabeledInput value={book.title} id="title" placeholder="Book Title"onChange={handleChange} />
            <LabeledInput value={book.author} id="author_id" placeholder="Author ID" onChange={handleChange} />
            <LabeledInput value={book.price}  id="price" placeholder="Price" onChange={handleChange} />
            <LabeledInput value={book.cover} id="cover" placeholder="Cover" onChange={handleChange} />
            <LabeledTextArea value={book.description} id="description" placeholder="Description" onChange={handleChange} />
            <button onClick={handleSave} type="submit" className='btn  btn-primary'>Save</button>
            <ValidationErrors error={errors} />
        </form>
    );
};

export default BookEditor;