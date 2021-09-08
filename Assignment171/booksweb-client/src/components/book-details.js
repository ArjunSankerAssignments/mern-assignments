import React from 'react';
import "./book-details.css";
import Expander from "./expander";



const Component=({book,onExit})=>{

    if(!book)
        return null; //no content to display
    
    return (
        <div className='book-details'>
            <h2>{book.title}</h2>
            <h3>by {book.author}</h3>
            <button class='btn btn-primary' onClick={onExit}>Back to List</button>
            <div className='book-info'>
                <img src={book.cover}/>
                <div className='info'>
                    <ul>
                        <li>Price: {book.price}</li>
                        <li>Rating: {book.rating}</li>
                    </ul>
                    <hr/>
                    {//<h4>Synopsis</h4>
                    //<p>{book.description</p>
                    }
                    <Expander title="Synopsis" content={book.description} short={100} />
                </div>
            </div>
        </div>
    );
}


export default Component;