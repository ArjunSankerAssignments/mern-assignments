import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from './loading';
import NotFound from './not-found';
import ConfirmPopup from './confirm-popup';
import { BookService } from '../services/book-service';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTrash, faInfo, faEdit, } from '@fortawesome/free-solid-svg-icons'


const Component = () => {

    const [books, setBooks] = useState([]);

    const [book, setBook] = useState(null);
    useEffect(() => {
        BookService.instance
            .getAll()
            .then(setBooks);     //.then(books=>setBooks(books))
    }, []);

    const handleDelete = async (book) => {
        setBook(book);
    }

    const handleCancel = () => {
        setBook(null);
    }

    const handleConfirm = async () => {
        
        console.log('trying to delete ',book.isbn);
        let result = await BookService.instance.removeBook(book.isbn);
        if (result.success) {
            let newBooks = books.filter(b => b.isbn !== book.isbn);
            setBooks(newBooks);
        } else{
            alert("Failed to delete book"+ result.error.message);
        }
        setBook(null);
    }


    if (books === null) {
        return <NotFound title="Error Connecting to Server" message="Ple try a little Later" />
    }

    if (books.length === 0) {
        return <Loading text="building our recommendation" />
    }

    return (
        <div className='book-list'>
            <h2>Our Recommendations</h2>
            <button data-toggle="modal">Confirm</button>
            <ConfirmPopup title="Confirm Delete"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                show={book}
            >
                <div className="row">
                    <img src={book?.cover} alt={book?.title} style={{ width: 80 }} className="col col-4"></img>
                    <div className="col col-8">{book?.title}</div>
                </div>
            </ConfirmPopup>
            <table className="table table-striped table-compact table-hover">
                <thead>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        books.map((book) => (
                            <tr key={book._id}>
                                <td><img src={book.cover} /></td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>

                                    <Link to={`/book/details/${book.isbn}`} className='btn  btn-primary'><FontAwesomeIcon icon={faInfo} /> </Link>
                                    <Link to={`/book/edit/${book.isbn}`} className='btn  btn-primary '><FontAwesomeIcon icon={faEdit} /></Link>
                                    <button onClick={() => handleDelete(book)} className='btn btn-danger'><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                        ))
                    }



                </tbody>
            </table>

        </div>);
}

export default Component