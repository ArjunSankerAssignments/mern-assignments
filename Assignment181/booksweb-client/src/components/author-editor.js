import React, {useState}from 'react';
import {LabeledInput,LabeledTextArea} from './input-controls';
import ValidationErrors from './validation-errors';
import {useHistory} from 'react-router-dom';


const AuthorEditor=(props)=>{

    const [author,setAuthor]=useState(props.author);
    const [errors,setErrors]= useState(null, props);
    const history=useHistory();

    const handleSave=async(e)=>{
        e.preventDefault();
        const result= await props.onSave(author);
        console.log("Inside editor",result)
        if(result.success)
            history.push('/author/list'); //goto /author/list
        else{
            const _errors= result.error.response.data.error.errors;
            setErrors(_errors);
        }        
    }

    

    const handleChange=(id,value)=>{
        console.log('inside handle change',id)
        author[id]=value;
        setAuthor({...author});
        console.log(author,"author");
    }

    return (
        <form>
            <LabeledInput value={author.id} id='id' placeholder="Author ID" onChange={handleChange} />
            <LabeledInput value={author.name} id="name" placeholder="Author Name" onChange={handleChange} />
            <LabeledInput value={author.photo} id="photo" placeholder="Photo URL" onChange={handleChange} />
            <LabeledTextArea value={author.biography}  id="biography" placeholder="Please provide a biography of the Author" onChange={handleChange} />
            
            <button onClick={handleSave} type="submit" className='btn  btn-primary'>Save</button>
            <ValidationErrors error={errors} />
        </form>
    );
};

export default AuthorEditor;