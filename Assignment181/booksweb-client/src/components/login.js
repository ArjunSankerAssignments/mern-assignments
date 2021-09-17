import React, {useState}from 'react';
import {LabeledInput,LabeledTextArea} from './input-controls';

const Login = ()=>{
    return(
        <div>
            <h2>User Login</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input  type="text"          
                            id="username"
                            className="form-control"          
                            placeholder="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input  type="password"          
                            id="password"
                            className="form-control"          
                            placeholder="password"
                    />
                </div>
                <button  type="submit" className='btn  btn-primary'>Login</button>
            </form>
        </div>
    )
}

export default Login;