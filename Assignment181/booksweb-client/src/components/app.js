import React,{useState} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppHeader from './app-header';
import AppFooter from './app-footer';
import AppHome from './app-home';
import BookDetails from './book-details';
import BookList from './book-list';
import BookAdd from './book-add';
import NotFound from './not-found';
import BookEdit from './book-edit';
import AuthorList from './author-list';
import Login from './login';
import Signup from './signup';
import If from './if';
import AuthorAdd from './add-author';
import AuthorDetails from './author-details';
import AuthorEdit from './author-edit';

const Component=({title})=>{
   
    return <div className='main'>
           

            <BrowserRouter>
                <AppHeader title={title} />
                <div className='container'>
                    <Switch>
                        
                        <Route path="/" exact={true} >
                            <AppHome title="Book's Home"/>
                        </Route>
                        
                        <Route path="/book/list">
                            <BookList />
                        </Route>

                        <Route path="/book/add" component={BookAdd} />
                        
                        <Route path="/book/details/:isbn" >
                            <BookDetails  />
                        </Route>
                        <Route path="/book/edit/:isbn" >
                            <BookEdit  />
                        </Route>
                        <Route path="/author/list">
                            <AuthorList />
                        </Route>
                        <Route path="/author/add" component={AuthorAdd} />

                        <Route path="/author/details/:id" >
                            <AuthorDetails />
                        </Route>
                        <Route path="/author/edit/:id" >
                            <AuthorEdit  />
                        </Route>
                        <Route path="/user/signin" component ={Login} />
                        <Route path="/user/signup" component ={Signup} />
                        <Route>
                            <AuthorAdd />
                        </Route>
                        

                        <Route path="*" component={NotFound} />
                        
                    </Switch>
                </div>            
                <AppFooter copyright="conceptarchitect.in" url="http://conceptarchitect.in" />
            </BrowserRouter>           

            
        </div>;
};


export default Component;