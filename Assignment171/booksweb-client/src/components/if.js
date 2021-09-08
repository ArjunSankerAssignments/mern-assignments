
import React from 'react';


const If=({condition,children})=>{
    console.log("In If, condition", condition, children);

    if(condition) 
        return children;
    else
        return null;
}

export default If;