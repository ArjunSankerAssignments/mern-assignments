import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import App from  './components/app';
import createStore from './store';
import {Provider} from 'react-redux';


ReactDOM.render(
    <Provider store={createStore()}><App title="Book's Web"/></Provider>, 
                document.querySelector("#root"));