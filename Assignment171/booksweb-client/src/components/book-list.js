import React from 'react';


const Component = ({books,onSelectBook,onDeleteBook}) => {

   
    return (
        <div className='book-list'>
            <h2>Our Recommendations</h2>

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
                            <tr key={book.isbn}>
                                <td><img src={book.cover} /></td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>
                                    <button onClick={()=>onSelectBook(book.isbn)} className='btn btn-sm btn-primary'>details</button>
                                    <button onClick={()=>onDeleteBook(book.isbn)} className='btn btn-sm btn-danger'>delete</button>
                                </td>
                            </tr>
                        ))
                    }



                </tbody>
            </table>

        </div>);
}

export default Component;