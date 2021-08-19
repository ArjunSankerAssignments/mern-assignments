
findEvens = function(arr){
    let retArray = [];
    for(let val of arr)
        if(val%2 === 0)
            retArray.push(val);
    return retArray;
}

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

isDiv = function(arr){
    let retArray = [];

    for(let val of arr)
        if (( val%3 === 0) && (val%5 === 0))
            retArray.push(val);
    return retArray;
}

findPrimes = function(arr){
    let retArray = [];
    for(let val of arr)
        if (isPrime(val))
            retArray.push(val);
        
    return retArray;

}

console.log(findEvens([1,2,3,4,5]));
console.log(findPrimes([1,2,3,4,5]));
console.log(isDiv([1,2,3,4,5,15]));