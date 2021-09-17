import React, { useState } from 'react';
import { LabeledInput } from './input-controls';
import ValidationErrors from './validation-errors';
import {UserService} from '../services/user-service';



const Component = (props) => {

    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState(null);
    //const history = useHistory();


    const handleChange = (id, value) => {
        loginUser[id] = value;
        setLoginUser({ ...loginUser });
    }

    const handleLogin = async(e) => {
        e.preventDefault();
        //console.log('trying to login', loginUser);
        let result=await UserService.instance.login(loginUser);

        if(result.success){
            setErrors(null);
            console.log(result.data);
        } else{
            setErrors(result.error.response.data.message);
        }
    }

    return (
        <div>
            <h2>User Login</h2>
            <div className="row">
                <div className="col col-7"></div>
                <div className="col col-5">
                    <form>
                        <LabeledInput value={loginUser.email} id='email' onChange={handleChange} />
                        <LabeledInput value={loginUser.password} type="password" id="password" onChange={handleChange} />
                        <button onClick={handleLogin} type="submit" className='btn  btn-primary'>Login</button>
                        <p className="text text-danger">{errors}</p>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default Component;