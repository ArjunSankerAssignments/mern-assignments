import React, { useState } from 'react';
import { LabeledInput, LabeledTextArea } from './input-controls';
import ValidationErrors from './validation-errors';
import { useHistory } from 'react-router-dom';


const BookEditor = (props) => {

    const [book, setBook] = useState(props.book);
    const [errors, setErrors] = useState(null, props);
    const history = useHistory();

    // const handleSave=(e)=>{
    //     e.preventDefault();
    //     //console.log('book',book);
    //     props.onSave(book);

    // }

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            console.log('props.onSave',props.onSave);
            const result = await props.onSave(book);
            if (result.success)
                return history.push('/book/list'); //goto /book/list


            if(result.error.response.status===401){
                setErrors({unauthorized:{message:"UnAuthorized"}});
                console.log("You are unauthorized");
            }
            else {
               
                const _errors = result.error.response.data.error.errors;
                setErrors(_errors);
            }
        } catch (error) {
            console.log('error', error);
        }
    }



    const handleChange = (id, value) => {
        book[id] = value;
        setBook({ ...book });
    }

    return (
        <form>
            <LabeledInput value={book.isbn} id='isbn' onChange={handleChange} />
            <LabeledInput value={book.title} id="title" onChange={handleChange} />
            <LabeledInput value={book.author} id="author" onChange={handleChange} />
            <LabeledInput value={book.price} id="price" onChange={handleChange} />
            <LabeledInput value={book.cover} id="cover" onChange={handleChange} />
            <LabeledTextArea value={book.description} id="description" onChange={handleChange} />
            <button onClick={handleSave} type="submit" className='btn  btn-primary'>Save</button>
            <ValidationErrors error={errors} />
        </form>
    );
};

export default BookEditor;