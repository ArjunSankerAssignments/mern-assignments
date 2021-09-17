import React, {useState} from "react";
import If from "./if"

const getStringOflen=(str, len)=>{
    
    if(len>=str.split(" ").length)
        return str;
    
    let words = str.split(" ").slice(0,len);
    
    //return words.reduce((acc, current)=>acc+" "+current);
    return words.join(" ");
}

const Component=({title, content, short})=>{
    const[desString, setString] = useState(getStringOflen(content, short));

    const handleClick=(flag)=>flag?setString(content):setString(getStringOflen(content, short));

    return (
        <div>

            <h4>Synopsis</h4>
            
            <p>
                {desString+" "}
                
                {<If condition={desString.split(" ").length>short}>
                    <a href="#0" onClick={()=>handleClick(false)}>less...</a>
                </If>}
                
                {<If condition={desString.split(" ").length===short}>
                    <a href="#0" onClick={()=>handleClick(true)}>more...</a>
                </If>}
            </p>

        </div>
        
    );
}

export default Component;