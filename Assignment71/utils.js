

let sum=(...params)=>{
    return params.reduce((a,e)=>a+e,0);
}

let average=(...params)=>{
    return sum(...params)/params.length;
}

let plus=(x,y)=>{
    return x+y;
}


module.exports.sum=sum;
module.exports.avg=average;;
//module.exports.plus=plus; //<--- not exported.