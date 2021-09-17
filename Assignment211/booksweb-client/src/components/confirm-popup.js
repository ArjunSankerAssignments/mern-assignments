import React, { useState } from 'react'



const Component = ({title,children,show,onCancel,onConfirm}) => {

   

    const style = {
        border: "1px solid black",
        position: "fixed", 
        "zIndex": 1, 
        left: 100,
        top: 200,
        width: "400px", 
       
        overflow: "auto",
        background: "white",
        borderRadius:"20px",
        "boxShadow":"-5px -5px 5px black"
    };

    const heading={
        textAlign: "center",
        padding:"5px",
        borderBottom: "1px solid black"
    
    };

    const content={
        justifySelf:"stretch",
        minHeight:"200px",
        flex:1,
        padding:10
    }

    const footer={
        textAlign:"right",
        "borderTop":"1px solid black"
    }
    const container={
        display:"flex",
        flexDirection:"column",
        alignContent:"space-between",
        justifyContent:"space-between"
    }
   if(!show)
        return null;
    return (
    <div className='modal_popup' style={style}>
        <div className='modal-container' style={container}>
            <div style={heading}>
            <h3>{title}</h3>
            </div>
            <div style={content}>
                    {children}
            </div>
            <div style={footer}>
                <button onClick={onCancel} className="btn btn-secondary">Cancel</button>
                <button onClick={onConfirm} className="btn btn-primary">Confirm</button>
            </div>
        </div>
    </div>
);
}


const _Component = (props) => {

    return (
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    )

};


export default Component;