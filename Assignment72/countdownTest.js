function countDown(max){
    return new Promise((resolve, reject)=>{
        let result = max;
        let iid = setInterval(()=>{

            if(max<1){
                clearInterval(iid);
                return(reject (new Error("Value less than 1")));
            }
            if(result<=1){
                clearInterval(iid);
                return resolve(result);
            }

            console.log(result--);
        }, 1000);
    });
}

countDown(10).then((result)=>{
        console.log(result)
        console.log("Done")
    
}).catch(error=>{
    console.log(error);
});