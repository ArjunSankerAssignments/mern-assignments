import React from 'react'

const component=(props)=>{

    const borders=[
        "br bb",
        "bl bb br",
        "bl bb",
        
        "bt br bb",
        "bl bt br bb",
        "bl bt bb",

        "bt br",
        "bl bt br",
        "bl bt"

    ]


    let winner=props.winningCombo;

    let data= props.content || "_";       
    const onCellClick=()=>{
        if(!props.content && !winner)
            props.onCellClick(props.id); //allow click on empty cell only
    }

    let iAmWinner=false;
    if(winner){
        const id=props.id;
        if(id===winner[0]||id===winner[1]||id===winner[2])
            iAmWinner=true;
    }

    let style={
        //make '_' present but invisible.
        color: data==='_'?'transparent':'black',
        cursor: data==='_' && !winner ?'hand': 'not-allowed',
        background: iAmWinner? 'lightgreen': 'white'
    }

    const className=`cell ${borders[props.id]}`;

    return (
        <button style={style}   className={className}
                onClick={onCellClick}  >{data}</button>
    );
}



export default component;