// const primes= require('./primes');
// console.log('primes',primes);


const {findPrimesAsync} = require('./primes');


function findAndPrintPrimes(max){

    let start= Date.now();
    console.log('finding primes between 2 and ',max);

    findPrimesAsync(2,max)
        .then(primes=>{
            let end= Date.now();
            console.log('total primes between 2 and ',max, ' is ',primes.length);
            console.log('total time taken is',(end-start),'ms');
            console.log();
        })
        .catch(error=>console.log('error',error.message))

    
}

function testfindAndPrintPrime(){
    findAndPrintPrimes(200000);
    findAndPrintPrimes(2000);
    findAndPrintPrimes(-100);
}

testfindAndPrintPrime();