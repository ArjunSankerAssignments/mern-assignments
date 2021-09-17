import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/', 
    mode: 'no-cors',   
    headers: {
       
        //'Access-Control-Allow-Origin': '*',   
        "x-api-key":"LET ME PASS",
        "Content-Type":"application/json",  
    } 
  });

export default instance;