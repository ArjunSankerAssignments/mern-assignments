function isPrime(num){
    if(num>1){
        prime = true;
        for(let i = 2; i < num; i++){
            if (num%i === 0)
                return false; 
        }
        if(prime)
            return true;
    }
    return false;
}

find = function(list, matching){
    results = [];

    for(let val of list){
        if(matching(val))
            results.push(val);
    }
    return results
}


console.log(find([1,2,5,7,19,31,15,16,20], isPrime))