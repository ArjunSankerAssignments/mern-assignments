import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from './search-bar';
import MemberToolbar from './member-toolbar';


const component = ({ title }) => {

    return <nav className="navbar navbar-expand-lg   navbar-dark bg-dark" >
        <Link className="navbar-brand" to="/">{title}</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/book/list">Books <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/book/add">Add Book</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/author/list">Authors</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/author/add">Add Author</Link>
                </li>

            </ul>
            <SearchBar onSearch={text=>console.log('searching for ',text)}/>
            <MemberToolbar/>
           
        </div>
    </nav>;

};

export default component;