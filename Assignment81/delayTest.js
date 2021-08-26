
let delay = function(dTIme){
    return new Promise((resolve, reject)=>{
        let tid = setTimeout(()=>{resolve();}, dTIme);  
        //clearTimeout(tid);    
        return;
        
    });
}

delay(5000).then(()=>console.log("Success"));