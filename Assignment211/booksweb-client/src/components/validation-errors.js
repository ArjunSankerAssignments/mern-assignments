import React from 'react';

const Component = ({error})=>{
    
    if(!error) 
        return null;

    let errors=[];

    for(let key in error){
        if(error[key].name!=="ValidatorError")
            continue;
        let e={
            key,
            message: error[key].message
        };
        errors.push(e);
    }

    return (
        <>
            <h3 className='text text-danger'>Validation Errors</h3>
            <ul>
                { errors.map(e=><li className='text text-danger'>{e.message}</li>)}
            </ul>
        </>
    );


}

export default Component;